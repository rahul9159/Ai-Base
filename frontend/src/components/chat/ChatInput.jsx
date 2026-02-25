import React, { useEffect, useRef, useState } from 'react';
import { Plus, Mic, AudioLines, ArrowUp, X } from 'lucide-react';
import { motion } from 'framer-motion';

const ChatInput = ({
  onSend,
  disabled,
  inputText,
  setInputText,
  isEditing = false,
  onCancelEdit,
  theme = 'dark',
  assistantMode = 'coding',
  onAssistantModeChange,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [showModeMenu, setShowModeMenu] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechSupported(false);
      return;
    }

    setSpeechSupported(true);
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = true;
    recognition.continuous = false;

    recognition.onresult = (event) => {
      let finalText = '';
      let interimText = '';

      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) finalText += transcript;
        else interimText += transcript;
      }

      const spokenText = `${finalText}${interimText}`.trim();
      if (spokenText) {
        setInputText((prev) => {
          if (!prev.trim()) return spokenText;
          return `${prev} ${spokenText}`.trim();
        });
      }
    };

    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);
    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim() && !disabled) {
      onSend(inputText.trim());
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (inputText.trim() && !disabled) {
        onSend(inputText.trim());
      }
    }
  };

  const handleMicClick = () => {
    if (!speechSupported || disabled || !recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    recognitionRef.current.start();
    setIsListening(true);
  };

  const modes = [
    { key: 'coding', label: 'Coding' },
    { key: 'content', label: 'Content' },
    { key: 'creator', label: 'Creator' },
  ];

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="relative">
        {isEditing && (
          <div className={`mb-2 flex items-center justify-between rounded-lg px-3 py-2 text-xs ${
            theme === 'dark' ? 'bg-neutral-800 text-neutral-200' : 'bg-neutral-200 text-neutral-700'
          }`}>
            <span>Editing message</span>
            <button type="button" onClick={onCancelEdit} className="inline-flex items-center gap-1 hover:underline">
              <X className="w-3 h-3" /> Cancel
            </button>
          </div>
        )}

        <div className={`relative flex items-center gap-2 rounded-full border px-3 py-2 shadow-[0_0_40px_rgba(0,0,0,0.25)] ${
          theme === 'dark'
            ? 'border-neutral-700 bg-neutral-800/90'
            : 'border-neutral-300 bg-white'
        }`}>
          <button
            type="button"
            onClick={() => setShowModeMenu((prev) => !prev)}
            className={`h-9 w-9 rounded-full transition-colors flex items-center justify-center ${
              theme === 'dark'
                ? 'text-neutral-300 hover:bg-neutral-700 hover:text-white'
                : 'text-neutral-700 hover:bg-neutral-100 hover:text-black'
            }`}
            title="Select mode"
          >
            <Plus className="w-4 h-4" />
          </button>
          {showModeMenu && (
            <div className={`absolute bottom-14 left-0 z-30 min-w-[170px] rounded-xl border p-2 shadow-xl ${
              theme === 'dark' ? 'border-neutral-700 bg-[#1d1d1d]' : 'border-neutral-300 bg-white'
            }`}>
              {modes.map((mode) => (
                <button
                  key={mode.key}
                  type="button"
                  onClick={() => {
                    onAssistantModeChange?.(mode.key);
                    setShowModeMenu(false);
                  }}
                  className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                    assistantMode === mode.key
                      ? theme === 'dark'
                        ? 'bg-neutral-700 text-white'
                        : 'bg-neutral-200 text-black'
                      : theme === 'dark'
                        ? 'text-neutral-200 hover:bg-neutral-800'
                        : 'text-neutral-800 hover:bg-neutral-100'
                  }`}
                >
                  {mode.label}
                </button>
              ))}
            </div>
          )}

          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isEditing ? 'Edit your message and press Enter' : 'Ask anything'}
            disabled={disabled}
            rows={1}
            className={`flex-1 bg-transparent outline-none text-lg resize-none max-h-40 ${
              theme === 'dark'
                ? 'text-neutral-100 placeholder:text-neutral-400'
                : 'text-neutral-900 placeholder:text-neutral-500'
            }`}
          />

          <button
            type="button"
            onClick={handleMicClick}
            disabled={!speechSupported || disabled}
            title={speechSupported ? (isListening ? 'Stop voice input' : 'Start voice input') : 'Voice input not supported'}
            className={`h-9 w-9 rounded-full transition-colors flex items-center justify-center ${
              isListening
                ? 'bg-red-500/20 text-red-400'
                : theme === 'dark'
                  ? 'text-neutral-300 hover:bg-neutral-700 hover:text-white'
                  : 'text-neutral-700 hover:bg-neutral-100 hover:text-black'
            } ${(!speechSupported || disabled) ? 'opacity-40 cursor-not-allowed' : ''}`}
          >
            <Mic className="w-4 h-4" />
          </button>

          <button
            type="button"
            className={`h-10 w-10 rounded-full transition-colors flex items-center justify-center ${
              theme === 'dark'
                ? 'bg-neutral-100 text-neutral-900 hover:bg-white'
                : 'bg-neutral-800 text-white hover:bg-black'
            }`}
            title="Voice"
          >
            <AudioLines className="w-4 h-4" />
          </button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={disabled || !inputText.trim()}
            className={`h-10 w-10 rounded-full flex items-center justify-center transition-colors ${
              inputText.trim() && !disabled
                ? theme === 'dark'
                  ? 'bg-white text-black'
                  : 'bg-black text-white'
                : theme === 'dark'
                  ? 'bg-neutral-700 text-neutral-400 cursor-not-allowed'
                  : 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
            }`}
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
