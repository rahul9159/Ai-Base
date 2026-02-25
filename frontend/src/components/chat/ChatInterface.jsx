// src/components/chat/ChatInterface.jsx
import React, { useState } from 'react';
import ChatSidebar from './ChatSidebar';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import { Gift, UserPlus, MoreHorizontal, Share2, Moon, Sun, Cpu } from 'lucide-react';
import { createChatSession, getChatMessages, replaceChatMessages, saveChatMessage } from '../../lib/api';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gpt-5.1');
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [shareNotice, setShareNotice] = useState('');
  const [inputText, setInputText] = useState('');
  const [editingUserIndex, setEditingUserIndex] = useState(null);
  const [theme, setTheme] = useState('dark');
  const [assistantMode, setAssistantMode] = useState('coding');
  const [showModelMenu, setShowModelMenu] = useState(false);

  // Keep UI labels, but allow backend auto provider/model selection.
  const modelMap = {
    'gpt-5.1': '',
    'gpt-5.2': '',
  };
  const styleSystemPromptBase = `
You are a ChatGPT-style assistant.
Response rules:
- Use clear headings, subheadings, and concise explanations.
- Keep tone professional and natural.
- For algorithm questions, provide practical answer first.
- Do NOT force fixed sections like "Problem", "Time Complexity", or "Space Complexity" in every response.
- Include time/space complexity only when user asks, or when it is truly needed.
- Use proper bullet points and proper numbering.
- Use markdown tables when comparing options.
- Use fenced code blocks for programs and pseudocode.
- Keep output aligned and readable.
- Avoid unnecessary long text.
- When user asks for code explanation, use this format:
  1) Short step title
  2) 1-2 line explanation
  3) Small code snippet for that step
- Prefer "line-by-line explanation" style when user requests detailed breakdown.
`.trim();

  const modePromptMap = {
    coding: 'Mode: CODING. Prefer programming solutions, debugging, architecture, and code quality.',
    content: 'Mode: CONTENT. Prefer polished writing, structure, readability, and publish-ready text.',
    creator: 'Mode: CREATOR. Prefer hooks, scripts, captions, engagement ideas, and creator-focused output.',
  };

  const buildProviderSafeMessages = (chatMessages, systemPrompt) => {
    const messagesWithoutSystem = chatMessages
      .filter((msg) => msg.role === 'user' || msg.role === 'assistant')
      .map((msg) => ({ ...msg }));

    const firstUserIndex = messagesWithoutSystem.findIndex((msg) => msg.role === 'user');
    const instructionPrefix = `[Assistant Instructions]\n${systemPrompt}\n\n[User Conversation]\n`;

    if (firstUserIndex === -1) {
      messagesWithoutSystem.unshift({ role: 'user', content: instructionPrefix });
      return messagesWithoutSystem;
    }

    messagesWithoutSystem[firstUserIndex].content = `${instructionPrefix}${messagesWithoutSystem[firstUserIndex].content}`;
    return messagesWithoutSystem;
  };

  const loadSession = async (sessionId) => {
    setIsLoading(true);
    try {
      const data = await getChatMessages(sessionId);
      setMessages(data.messages || []);
      setCurrentSessionId(sessionId);
    } catch (error) {
      console.error("Failed to load session:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setCurrentSessionId(null);
    setInputText('');
    setEditingUserIndex(null);
  };

  const handleProjectSelect = (projectId) => {
    setSelectedProjectId(projectId);
    setMessages([]);
    setCurrentSessionId(null);
    setInputText('');
    setEditingUserIndex(null);
  };

  const handleSend = async (content) => {
    const normalizedContent = content.trim();
    if (!normalizedContent) return;

    const isEditing = editingUserIndex !== null;
    const updatedMessages = isEditing
      ? messages
          .slice(0, editingUserIndex + 1)
          .map((msg, idx) => (idx === editingUserIndex ? { ...msg, content: normalizedContent } : msg))
      : [...messages, { role: 'user', content: normalizedContent }];

    setMessages(updatedMessages);
    setInputText('');
    setEditingUserIndex(null);
    setIsLoading(true);

    let sessionId = currentSessionId;

    // Create session if not exists
    if (!sessionId) {
      try {
        // Generate title from first few words
        const title = normalizedContent.substring(0, 30) + (normalizedContent.length > 30 ? '...' : '');
        const sessionData = await createChatSession(title, selectedProjectId);
        sessionId = sessionData.id;
        setCurrentSessionId(sessionId);
      } catch (error) {
        console.error("Failed to create session:", error);
      }
    }

    // Save user side for session persistence
    if (sessionId) {
      if (!isEditing) {
        await saveChatMessage(sessionId, 'user', normalizedContent);
      }
    }

    try {
      const systemPrompt = `${styleSystemPromptBase}\n\n${modePromptMap[assistantMode] || modePromptMap.coding}`;
      const outgoingMessages = buildProviderSafeMessages(updatedMessages, systemPrompt);

      const selectedModelId = modelMap[selectedModel] || '';
      const requestBody = {
        provider: 'AnyProvider',
        messages: outgoingMessages,
        stream: true
      };
      if (selectedModelId) {
        requestBody.model = selectedModelId;
      }

      let response = await fetch('/backend-api/v2/conversation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      // Retry once with reduced payload if provider-side validation fails.
      if (!response.ok) {
        const firstErrorText = await response.text();
        if (response.status === 400 && firstErrorText.includes('JSON body validation failed')) {
          const reducedMessages = updatedMessages.filter(
            (msg) => msg.role === 'user' || msg.role === 'assistant'
          );
          response = await fetch('/backend-api/v2/conversation', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              provider: 'AnyProvider',
              ...(selectedModelId ? { model: selectedModelId } : {}),
              messages: reducedMessages,
              stream: true
            }),
          });
        } else {
          throw new Error(firstErrorText || `HTTP ${response.status}`);
        }
      }

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `HTTP ${response.status}`);
      }

      // Add assistant placeholder
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ') && line !== 'data: [DONE]') {
            const dataStr = line.slice(6).trim();
            if (!dataStr || dataStr === '[DONE]') continue;

            try {
              const parsed = JSON.parse(dataStr);
              let content = '';

              if (parsed.content) content = parsed.content;
              else if (parsed.text) content = parsed.text;
              else if (typeof parsed === 'string') content = parsed;

              if (content) {
                accumulatedContent += content;
                setMessages(prev => {
                  const newMsgs = [...prev];
                  newMsgs[newMsgs.length - 1].content = accumulatedContent;
                  return newMsgs;
                });
              }
            } catch {
              // Fallback for raw text in data:
              if (!dataStr.startsWith('{') && !dataStr.includes('[object')) {
                accumulatedContent += dataStr;
                setMessages(prev => {
                  const newMsgs = [...prev];
                  newMsgs[newMsgs.length - 1].content = accumulatedContent;
                  return newMsgs;
                });
              }
            }
          }
        }
      }

      if (accumulatedContent && sessionId) {
        if (isEditing) {
          await replaceChatMessages(sessionId, [...updatedMessages, { role: 'assistant', content: accumulatedContent }]);
        } else {
          await saveChatMessage(sessionId, 'assistant', accumulatedContent);
        }
      }

      if (!accumulatedContent) {
        const fallback = "_No response content received._";
        setMessages(prev => {
          const newMsgs = [...prev];
          newMsgs[newMsgs.length - 1].content = fallback;
          return newMsgs;
        });
        if (sessionId && isEditing) {
          await replaceChatMessages(sessionId, [...updatedMessages, { role: 'assistant', content: fallback }]);
        }
      }

    } catch (error) {
      const errorMessage = `⚠️ **Error**: ${error.message}`;
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: errorMessage
      }]);
      if (sessionId && isEditing) {
        await replaceChatMessages(sessionId, [...updatedMessages, { role: 'assistant', content: errorMessage }]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditUserMessage = (index) => {
    const target = messages[index];
    if (!target || target.role !== 'user') return;
    setEditingUserIndex(index);
    setInputText(target.content || '');
  };

  const handleCancelEdit = () => {
    setEditingUserIndex(null);
    setInputText('');
  };

  const handleShareUserChats = async () => {
    const userTexts = messages
      .filter((msg) => msg.role === 'user' && msg.content?.trim())
      .map((msg, idx) => `${idx + 1}. ${msg.content.trim()}`);

    if (userTexts.length === 0) {
      setShareNotice('No user chats to share');
      setTimeout(() => setShareNotice(''), 1800);
      return;
    }

    const shareText = userTexts.join('\n\n');

    try {
      if (navigator.share) {
        await navigator.share({ text: shareText });
      } else {
        await navigator.clipboard.writeText(shareText);
      }
      setShareNotice('Shared user chats');
    } catch {
      setShareNotice('Share canceled');
    } finally {
      setTimeout(() => setShareNotice(''), 1800);
    }
  };

  return (
    <div className={`flex h-screen w-full overflow-hidden ${theme === 'dark' ? 'bg-[#212121] text-neutral-100' : 'bg-[#f5f6f8] text-neutral-900'}`}>
      <ChatSidebar
        onSessionSelect={loadSession}
        onNewChat={handleNewChat}
        currentSessionId={currentSessionId}
        selectedProjectId={selectedProjectId}
        onProjectSelect={handleProjectSelect}
        theme="dark"
      />

      <main className="flex-1 flex flex-col min-w-0 relative">
        <header className={`h-14 px-6 flex items-center justify-between border-b ${theme === 'dark' ? 'border-neutral-800/70 bg-[#212121]/95' : 'border-neutral-300 bg-white/95'}`}>
          <div className="flex items-center gap-2 relative">
            <h1 className="text-[32px] leading-none font-medium">ChatGPT</h1>
            <button
              onClick={() => setShowModelMenu((prev) => !prev)}
              className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm ${
                theme === 'dark' ? 'text-neutral-300 hover:bg-neutral-800' : 'text-neutral-700 hover:bg-neutral-200'
              }`}
              title="Select model"
            >
              <Cpu className="w-4 h-4" />
              <span>{selectedModel}</span>
              <span className={`${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'} text-lg leading-none`}>▾</span>
            </button>
            {showModelMenu && (
              <div className={`absolute left-0 top-12 z-30 min-w-[190px] rounded-xl border p-2 shadow-xl ${
                theme === 'dark' ? 'border-neutral-700 bg-[#1d1d1d]' : 'border-neutral-300 bg-white'
              }`}>
                {Object.keys(modelMap).map((modelKey) => (
                  <button
                    key={modelKey}
                    onClick={() => {
                      setSelectedModel(modelKey);
                      setShowModelMenu(false);
                    }}
                    className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                      selectedModel === modelKey
                        ? theme === 'dark'
                          ? 'bg-neutral-700 text-white'
                          : 'bg-neutral-200 text-black'
                        : theme === 'dark'
                          ? 'text-neutral-200 hover:bg-neutral-800'
                          : 'text-neutral-800 hover:bg-neutral-100'
                    }`}
                  >
                    <span>{modelKey}</span>
                    <span className={`ml-2 text-xs ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`}>
                      ({modelMap[modelKey]})
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm transition-colors ${theme === 'dark' ? 'bg-indigo-600/45 text-indigo-100 hover:bg-indigo-500/55' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'}`}>
              <Gift className="w-3.5 h-3.5" />
              Free offer
            </button>
            <button
              onClick={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
              className={theme === 'dark' ? 'text-neutral-300 hover:text-white' : 'text-neutral-700 hover:text-black'}
              title="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button className={theme === 'dark' ? 'text-neutral-300 hover:text-white' : 'text-neutral-700 hover:text-black'}><UserPlus className="w-4 h-4" /></button>
            <button
              onClick={handleShareUserChats}
              className={theme === 'dark' ? 'text-neutral-300 hover:text-white' : 'text-neutral-700 hover:text-black'}
              title="Share user chats only"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button className={theme === 'dark' ? 'text-neutral-300 hover:text-white' : 'text-neutral-700 hover:text-black'}><MoreHorizontal className="w-4 h-4" /></button>
          </div>
        </header>

        {messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 pb-36">
            <h2 className={`text-5xl font-medium mb-12 ${theme === 'dark' ? 'text-neutral-100' : 'text-neutral-900'}`}>Ready when you are.</h2>
          </div>
        ) : (
          <MessageList
            messages={messages}
            isLoading={isLoading}
            theme={theme}
            onEditUserMessage={handleEditUserMessage}
          />
        )}

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[min(760px,calc(100%-2rem))]">
          <ChatInput
            onSend={handleSend}
            disabled={isLoading}
            inputText={inputText}
            setInputText={setInputText}
            isEditing={editingUserIndex !== null}
            onCancelEdit={handleCancelEdit}
            theme={theme}
            assistantMode={assistantMode}
            onAssistantModeChange={setAssistantMode}
          />
          {shareNotice && (
            <p className={`mt-2 text-center text-xs ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>{shareNotice}</p>
          )}
          <p className={`mt-2 text-center text-xs ${theme === 'dark' ? 'text-neutral-500' : 'text-neutral-600'}`}>
            ChatGPT can make mistakes. Check important info.
          </p>
        </div>
      </main>
    </div>
  );
};

export default ChatInterface;
