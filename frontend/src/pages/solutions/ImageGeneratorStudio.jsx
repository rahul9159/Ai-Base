import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Download,
  ImagePlus,
  ImageUp,
  Layers,
  Loader2,
  PlusSquare,
  Scissors,
  Sparkles,
  Type,
  Shapes,
  Trash2
} from 'lucide-react';

const FREE_MODEL = 'flux';
const GEMINI_FIXED_MODEL = 'gemini-2.0-flash';

function uid(prefix) {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

function extractImageUrl(payload) {
  if (!payload || typeof payload !== 'object') return '';
  const first = Array.isArray(payload.data) ? payload.data[0] : null;
  if (first?.url) return first.url;
  if (first?.b64_json) return `data:image/png;base64,${first.b64_json}`;
  return '';
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Unable to read file'));
    reader.readAsDataURL(file);
  });
}

function withImageCropStyle(crop) {
  const safeW = Math.max(1, crop.w);
  const safeH = Math.max(1, crop.h);
  const scaleX = 100 / safeW;
  const scaleY = 100 / safeH;
  return {
    width: `${scaleX * 100}%`,
    height: `${scaleY * 100}%`,
    marginLeft: `-${crop.x * scaleX}%`,
    marginTop: `-${crop.y * scaleY}%`
  };
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function createPage(width, height) {
  return {
    id: uid('page'),
    width,
    height,
    objects: []
  };
}

export default function ImageGeneratorStudio() {
  const [pages, setPages] = useState([createPage(1280, 720)]);
  const [activePageId, setActivePageId] = useState(() => pages[0]?.id || '');
  const [selectedObjectId, setSelectedObjectId] = useState('');

  const [showNewPageModal, setShowNewPageModal] = useState(false);
  const [newPageWidth, setNewPageWidth] = useState(1280);
  const [newPageHeight, setNewPageHeight] = useState(720);

  const [activePanel, setActivePanel] = useState('generate');
  const [textInsertMode, setTextInsertMode] = useState(false);
  const [pendingText, setPendingText] = useState('New Text');

  const [prompt, setPrompt] = useState('');
  const [geminiApiKey, setGeminiApiKey] = useState('');
  const [geminiRefImage, setGeminiRefImage] = useState('');

  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState('');

  const pageImageInputRef = useRef(null);
  const geminiRefFileRef = useRef(null);
  const pageViewportRef = useRef(null);
  const pageCanvasRef = useRef(null);
  const dragRef = useRef(null);
  const resizeRef = useRef(null);

  const activePage = useMemo(() => pages.find((p) => p.id === activePageId) || pages[0], [pages, activePageId]);

  const selectedObject = useMemo(() => {
    if (!activePage) return null;
    return activePage.objects.find((obj) => obj.id === selectedObjectId) || null;
  }, [activePage, selectedObjectId]);

  const updateActivePage = (updater) => {
    setPages((prev) => prev.map((p) => (p.id === activePageId ? updater(p) : p)));
  };

  const addObjectToActivePage = (obj) => {
    updateActivePage((p) => ({ ...p, objects: [...p.objects, obj] }));
    setSelectedObjectId(obj.id);
  };

  const updateSelectedObject = (updater) => {
    if (!selectedObjectId) return;
    updateActivePage((p) => ({
      ...p,
      objects: p.objects.map((obj) => (obj.id === selectedObjectId ? updater(obj) : obj))
    }));
  };

  const removeSelectedObject = () => {
    if (!selectedObjectId) return;
    updateActivePage((p) => ({
      ...p,
      objects: p.objects.filter((obj) => obj.id !== selectedObjectId)
    }));
    setSelectedObjectId('');
  };

  const handleCreatePage = () => {
    const width = clamp(Number(newPageWidth) || 1280, 320, 4096);
    const height = clamp(Number(newPageHeight) || 720, 320, 4096);
    const page = createPage(width, height);
    setPages((prev) => [...prev, page]);
    setActivePageId(page.id);
    setSelectedObjectId('');
    setShowNewPageModal(false);
  };

  const handlePageImageImport = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await fileToDataUrl(file);
      addObjectToActivePage({
        id: uid('img'),
        type: 'image',
        src: dataUrl,
        x: 80,
        y: 80,
        w: 360,
        h: 240,
        crop: { x: 0, y: 0, w: 100, h: 100 }
      });
      setActivePanel('layers');
      setError('');
    } catch (err) {
      setError(err?.message || 'Failed to import image.');
    }
  };

  const handleGeminiRefUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await fileToDataUrl(file);
      setGeminiRefImage(dataUrl);
      setError('');
    } catch (err) {
      setError(err?.message || 'Failed to load reference image.');
    }
  };

  const handleGenerate = async (event) => {
    event.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError('');

    try {
      if (geminiApiKey.trim()) {
        const geminiResponse = await fetch('/api/gemini/generate-image/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            apiKey: geminiApiKey.trim(),
            model: GEMINI_FIXED_MODEL,
            prompt: prompt.trim(),
            imageDataUrl: geminiRefImage || ''
          })
        });

        const geminiPayload = await geminiResponse.json().catch(() => ({}));
        if (!geminiResponse.ok) {
          throw new Error(geminiPayload?.message || `Gemini error (${geminiResponse.status})`);
        }

        if (!geminiPayload?.imageDataUrl) {
          throw new Error('Gemini did not return image data.');
        }

        addObjectToActivePage({
          id: uid('img'),
          type: 'image',
          src: geminiPayload.imageDataUrl,
          x: 120,
          y: 90,
          w: 420,
          h: 280,
          crop: { x: 0, y: 0, w: 100, h: 100 }
        });
        setActivePanel('layers');
        return;
      }

      const response = await fetch('/v1/images/generations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: FREE_MODEL,
          prompt: prompt.trim(),
          response_format: 'url'
        })
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Free model endpoint not found (/v1/images/generations). Start your image API server or enter Gemini API key.');
        }
        throw new Error(payload?.error?.message || payload?.message || `Server error (${response.status})`);
      }

      const url = extractImageUrl(payload);
      if (!url) {
        throw new Error('No image returned by server.');
      }

      const res = await fetch(url);
      if (!res.ok) throw new Error('Cannot fetch generated image.');
      const blob = await res.blob();
      const dataUrl = await fileToDataUrl(new File([blob], 'generated.png', { type: blob.type || 'image/png' }));

      addObjectToActivePage({
        id: uid('img'),
        type: 'image',
        src: dataUrl,
        x: 120,
        y: 90,
        w: 420,
        h: 280,
        crop: { x: 0, y: 0, w: 100, h: 100 }
      });
      setActivePanel('layers');
    } catch (err) {
      setError(err?.message || 'Failed to generate image.');
    } finally {
      setLoading(false);
    }
  };

  const handlePageClick = (event) => {
    if (!pageCanvasRef.current || !activePage) return;

    if (!textInsertMode) {
      if (event.target === pageCanvasRef.current) setSelectedObjectId('');
      return;
    }

    const rect = pageCanvasRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * activePage.width;
    const y = ((event.clientY - rect.top) / rect.height) * activePage.height;

    addObjectToActivePage({
      id: uid('txt'),
      type: 'text',
      text: pendingText || 'Text',
      x,
      y,
      w: 240,
      h: 70,
      fontSize: 38,
      color: '#111827'
    });
    setTextInsertMode(false);
    setActivePanel('layers');
  };

  const startDrag = (event, obj) => {
    event.stopPropagation();
    if (!activePage || !pageCanvasRef.current) return;
    setSelectedObjectId(obj.id);

    const rect = pageCanvasRef.current.getBoundingClientRect();
    dragRef.current = {
      id: obj.id,
      startX: event.clientX,
      startY: event.clientY,
      originX: obj.x,
      originY: obj.y,
      scaleX: activePage.width / rect.width,
      scaleY: activePage.height / rect.height
    };
  };

  const startResize = (event, obj) => {
    event.stopPropagation();
    if (!activePage || !pageCanvasRef.current) return;
    setSelectedObjectId(obj.id);

    const rect = pageCanvasRef.current.getBoundingClientRect();
    resizeRef.current = {
      id: obj.id,
      startX: event.clientX,
      startY: event.clientY,
      originW: obj.w,
      originH: obj.h,
      scaleX: activePage.width / rect.width,
      scaleY: activePage.height / rect.height
    };
  };

  useEffect(() => {
    const onMove = (event) => {
      if (dragRef.current) {
        const d = dragRef.current;
        const dx = (event.clientX - d.startX) * d.scaleX;
        const dy = (event.clientY - d.startY) * d.scaleY;
        updateActivePage((p) => ({
          ...p,
          objects: p.objects.map((obj) =>
            obj.id === d.id
              ? {
                  ...obj,
                  x: clamp(d.originX + dx, 0, p.width - obj.w),
                  y: clamp(d.originY + dy, 0, p.height - obj.h)
                }
              : obj
          )
        }));
      }

      if (resizeRef.current) {
        const r = resizeRef.current;
        const dw = (event.clientX - r.startX) * r.scaleX;
        const dh = (event.clientY - r.startY) * r.scaleY;
        updateActivePage((p) => ({
          ...p,
          objects: p.objects.map((obj) =>
            obj.id === r.id
              ? { ...obj, w: clamp(r.originW + dw, 30, p.width), h: clamp(r.originH + dh, 30, p.height) }
              : obj
          )
        }));
      }
    };

    const onUp = () => {
      dragRef.current = null;
      resizeRef.current = null;
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [activePageId]);

  const handleDownloadPage = async () => {
    if (!activePage) return;
    setDownloading(true);
    try {
      const imageObject =
        activePage.objects.find((obj) => obj.id === selectedObjectId && obj.type === 'image') ||
        activePage.objects.find((obj) => obj.type === 'image');

      if (!imageObject) {
        throw new Error('Select or add an image object to download.');
      }

      const link = document.createElement('a');
      link.href = imageObject.src;
      link.download = `design-page-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      setError(err?.message || 'Failed to download page.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#edf0f7]">
      <div className="h-full w-full overflow-hidden border border-slate-300 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-3">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <span className="font-semibold text-slate-800">Design Studio</span>
            <span>/</span>
            <span>Pages</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button type="button" onClick={() => setShowNewPageModal(true)} className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-100">
              <PlusSquare className="h-4 w-4" /> New Page
            </button>
            <button type="button" onClick={() => pageImageInputRef.current?.click()} className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-100">
              <ImagePlus className="h-4 w-4" /> Import Image
            </button>
            <button type="button" onClick={() => setActivePanel('elements')} className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-100">
              <Shapes className="h-4 w-4" /> Elements
            </button>
            <button type="button" onClick={() => setActivePanel('crop')} className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-100">
              <Scissors className="h-4 w-4" /> Crop
            </button>
            <button type="button" onClick={() => { setTextInsertMode(true); setActivePanel('text'); }} className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-100">
              <Type className="h-4 w-4" /> Text
            </button>
            <button type="button" onClick={handleDownloadPage} disabled={downloading} className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-3 py-1.5 text-sm font-semibold text-white hover:bg-black disabled:opacity-60">
              {downloading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />} Download
            </button>
          </div>
        </div>

        <div className="grid h-[calc(100vh-57px)] grid-cols-[72px_1fr_360px]">
          <aside className="border-r border-slate-200 bg-slate-50 p-2">
            <div className="space-y-2">
              {[
                { id: 'generate', label: 'Generate', icon: Sparkles },
                { id: 'elements', label: 'Elements', icon: Shapes },
                { id: 'text', label: 'Text', icon: Type },
                { id: 'crop', label: 'Crop', icon: Scissors },
                { id: 'layers', label: 'Layers', icon: Layers }
              ].map((item) => {
                const Icon = item.icon;
                const active = activePanel === item.id;
                return (
                  <button key={item.id} type="button" onClick={() => setActivePanel(item.id)} className={`flex w-full flex-col items-center gap-1 rounded-lg px-1 py-2 text-[10px] font-semibold ${active ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:bg-slate-200'}`}>
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </aside>

          <main className="flex flex-col bg-[#e6e9f2]">
            <div className="flex-1 p-4">
              <div ref={pageViewportRef} className="flex h-full items-center justify-center rounded-xl border border-slate-300 bg-[#d5d9e4] p-4">
                {activePage ? (
                  <div
                    ref={pageCanvasRef}
                    onClick={handlePageClick}
                    className="relative overflow-hidden border border-slate-400 bg-white shadow-xl"
                    style={{
                      width: `${Math.min(activePage.width, 920)}px`,
                      height: `${(Math.min(activePage.width, 920) / activePage.width) * activePage.height}px`
                    }}
                  >
                    {activePage.objects.map((obj) => {
                      const scale = Math.min(activePage.width, 920) / activePage.width;
                      const style = {
                        left: `${obj.x * scale}px`,
                        top: `${obj.y * scale}px`,
                        width: `${obj.w * scale}px`,
                        height: `${obj.h * scale}px`
                      };

                      return (
                        <div
                          key={obj.id}
                          onMouseDown={(e) => startDrag(e, obj)}
                          onClick={(e) => { e.stopPropagation(); setSelectedObjectId(obj.id); }}
                          className={`absolute cursor-move overflow-hidden ${selectedObjectId === obj.id ? 'ring-2 ring-blue-500' : ''}`}
                          style={style}
                        >
                          {obj.type === 'image' ? (
                            <img src={obj.src} alt="Object" className="pointer-events-none select-none object-cover" style={withImageCropStyle(obj.crop || { x: 0, y: 0, w: 100, h: 100 })} draggable={false} />
                          ) : null}

                          {obj.type === 'text' ? (
                            <div className="pointer-events-none h-full w-full p-1" style={{ color: obj.color || '#111827', fontSize: `${(obj.fontSize || 36) * scale}px`, lineHeight: 1.1, fontWeight: 700 }}>
                              {obj.text}
                            </div>
                          ) : null}

                          {obj.type === 'logo' ? (
                            <div className="pointer-events-none flex h-full w-full items-center justify-center bg-slate-900 text-white" style={{ fontSize: `${20 * scale}px`, fontWeight: 800 }}>
                              AI BASE
                            </div>
                          ) : null}

                          {selectedObjectId === obj.id ? (
                            <button type="button" onMouseDown={(e) => startResize(e, obj)} className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-sm bg-blue-600" />
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="border-t border-slate-300 bg-slate-100 p-3">
              <div className="mb-2 text-xs font-semibold text-slate-600">Pages</div>
              <div className="flex gap-2 overflow-x-auto">
                {pages.map((p, index) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => { setActivePageId(p.id); setSelectedObjectId(''); }}
                    className={`h-16 w-28 shrink-0 rounded border text-left text-xs ${activePageId === p.id ? 'border-blue-500 bg-blue-50' : 'border-slate-300 bg-white'}`}
                  >
                    <div className="px-2 pt-1 font-semibold text-slate-700">Page {index + 1}</div>
                    <div className="px-2 text-[10px] text-slate-500">{p.width} x {p.height}</div>
                  </button>
                ))}
              </div>
            </div>
          </main>

          <aside className="border-l border-slate-200 bg-[#f8f9fc] p-4">
            <div className="mb-4 text-sm font-semibold text-slate-700">{activePanel[0].toUpperCase() + activePanel.slice(1)}</div>

            {activePanel === 'generate' ? (
              <form onSubmit={handleGenerate} className="space-y-3">
                <label className="block rounded-xl border border-slate-200 bg-white p-3">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Prompt</p>
                  <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} className="min-h-24 w-full rounded border border-slate-300 px-2 py-2 text-sm" placeholder="Generate image prompt" />
                </label>
                <label className="block rounded-xl border border-slate-200 bg-white p-3">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Gemini API Key (optional)</p>
                  <input type="password" value={geminiApiKey} onChange={(e) => setGeminiApiKey(e.target.value)} className="w-full rounded border border-slate-300 px-2 py-2 text-sm" placeholder="AIza..." />
                </label>
                <label className="block rounded-xl border border-slate-200 bg-white p-3">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Reference Image</p>
                  <button type="button" onClick={() => geminiRefFileRef.current?.click()} className="w-full rounded border border-slate-300 px-2 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">Upload</button>
                  {geminiRefImage ? <img src={geminiRefImage} alt="Reference" className="mt-2 h-20 w-full rounded border border-slate-300 object-cover" /> : null}
                </label>
                <button type="submit" disabled={loading || !prompt.trim()} className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white disabled:opacity-60">
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImageUp className="h-4 w-4" />}
                  {loading ? 'Generating...' : geminiApiKey.trim() ? 'Generate with Gemini' : 'Generate Free'}
                </button>
              </form>
            ) : null}

            {activePanel === 'elements' ? (
              <div className="space-y-2">
                <button type="button" onClick={() => { setTextInsertMode(true); setActivePanel('text'); }} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-100">Add Text Element</button>
                <button type="button" onClick={() => addObjectToActivePage({ id: uid('logo'), type: 'logo', x: 120, y: 120, w: 220, h: 90 })} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-100">Add Logo Element</button>
                <button type="button" onClick={() => pageImageInputRef.current?.click()} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-100">Add Image Element</button>
              </div>
            ) : null}

            {activePanel === 'crop' ? (
              selectedObject && selectedObject.type === 'image' ? (
                <div className="space-y-3">
                  <label className="block text-xs font-semibold text-slate-600">Crop X ({selectedObject.crop?.x || 0}%)</label>
                  <input type="range" min="0" max="95" value={selectedObject.crop?.x || 0} onChange={(e) => updateSelectedObject((obj) => ({ ...obj, crop: { ...(obj.crop || { x: 0, y: 0, w: 100, h: 100 }), x: Number(e.target.value) } }))} className="w-full accent-blue-600" />

                  <label className="block text-xs font-semibold text-slate-600">Crop Y ({selectedObject.crop?.y || 0}%)</label>
                  <input type="range" min="0" max="95" value={selectedObject.crop?.y || 0} onChange={(e) => updateSelectedObject((obj) => ({ ...obj, crop: { ...(obj.crop || { x: 0, y: 0, w: 100, h: 100 }), y: Number(e.target.value) } }))} className="w-full accent-blue-600" />

                  <label className="block text-xs font-semibold text-slate-600">Crop Width ({selectedObject.crop?.w || 100}%)</label>
                  <input type="range" min="5" max="100" value={selectedObject.crop?.w || 100} onChange={(e) => updateSelectedObject((obj) => ({ ...obj, crop: { ...(obj.crop || { x: 0, y: 0, w: 100, h: 100 }), w: Number(e.target.value) } }))} className="w-full accent-blue-600" />

                  <label className="block text-xs font-semibold text-slate-600">Crop Height ({selectedObject.crop?.h || 100}%)</label>
                  <input type="range" min="5" max="100" value={selectedObject.crop?.h || 100} onChange={(e) => updateSelectedObject((obj) => ({ ...obj, crop: { ...(obj.crop || { x: 0, y: 0, w: 100, h: 100 }), h: Number(e.target.value) } }))} className="w-full accent-blue-600" />
                </div>
              ) : (
                <p className="text-sm text-slate-600">Select an image object first.</p>
              )
            ) : null}

            {activePanel === 'text' ? (
              <div className="space-y-3">
                <label className="block rounded-xl border border-slate-200 bg-white p-3">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Text Content</p>
                  <input value={pendingText} onChange={(e) => setPendingText(e.target.value)} className="w-full rounded border border-slate-300 px-2 py-2 text-sm" />
                </label>
                <button type="button" onClick={() => setTextInsertMode(true)} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
                  Click page to place text
                </button>
                {selectedObject && selectedObject.type === 'text' ? (
                  <div className="space-y-2 rounded-xl border border-slate-200 bg-white p-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Selected Text Style</p>
                    <input value={selectedObject.text || ''} onChange={(e) => updateSelectedObject((obj) => ({ ...obj, text: e.target.value }))} className="w-full rounded border border-slate-300 px-2 py-2 text-sm" />
                    <input type="number" min="10" max="200" value={selectedObject.fontSize || 36} onChange={(e) => updateSelectedObject((obj) => ({ ...obj, fontSize: Number(e.target.value) }))} className="w-full rounded border border-slate-300 px-2 py-2 text-sm" />
                    <input type="color" value={selectedObject.color || '#111827'} onChange={(e) => updateSelectedObject((obj) => ({ ...obj, color: e.target.value }))} className="h-10 w-full rounded border border-slate-300" />
                  </div>
                ) : null}
              </div>
            ) : null}

            {activePanel === 'layers' ? (
              <div className="space-y-2">
                {activePage?.objects.map((obj, idx) => (
                  <button key={obj.id} type="button" onClick={() => setSelectedObjectId(obj.id)} className={`flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left text-sm ${selectedObjectId === obj.id ? 'border-blue-500 bg-blue-50' : 'border-slate-300 bg-white'}`}>
                    <span>
                      {idx + 1}. {obj.type === 'image' ? 'Image' : obj.type === 'text' ? 'Text' : obj.type === 'logo' ? 'Logo' : 'Object'}
                    </span>
                  </button>
                ))}
                <button type="button" onClick={removeSelectedObject} disabled={!selectedObjectId} className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-rose-300 bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700 disabled:opacity-60">
                  <Trash2 className="h-4 w-4" /> Delete Selected
                </button>
              </div>
            ) : null}

            {error ? <p className="mt-4 text-sm font-medium text-rose-600">{error}</p> : null}
          </aside>
        </div>

        <input ref={pageImageInputRef} type="file" accept="image/*" className="hidden" onChange={handlePageImageImport} />
        <input ref={geminiRefFileRef} type="file" accept="image/*" className="hidden" onChange={handleGeminiRefUpload} />

        {showNewPageModal ? (
          <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/30">
            <div className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-5 shadow-xl">
              <h3 className="text-lg font-semibold text-slate-900">Create New Page</h3>
              <p className="mt-1 text-sm text-slate-600">Enter page size (width and height).</p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <label className="text-sm text-slate-700">
                  Width
                  <input type="number" min="320" max="4096" value={newPageWidth} onChange={(e) => setNewPageWidth(Number(e.target.value))} className="mt-1 w-full rounded border border-slate-300 px-2 py-2" />
                </label>
                <label className="text-sm text-slate-700">
                  Height
                  <input type="number" min="320" max="4096" value={newPageHeight} onChange={(e) => setNewPageHeight(Number(e.target.value))} className="mt-1 w-full rounded border border-slate-300 px-2 py-2" />
                </label>
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <button type="button" onClick={() => setShowNewPageModal(false)} className="rounded border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">Cancel</button>
                <button type="button" onClick={handleCreatePage} className="rounded bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-black">Create Page</button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
