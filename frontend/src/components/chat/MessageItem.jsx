import React, { useRef, useState } from 'react';
import { Copy, Check, Pencil } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const LANGUAGE_KEYWORDS = {
  javascript: ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'switch', 'case', 'break', 'continue', 'class', 'new', 'try', 'catch', 'finally', 'import', 'export', 'from', 'async', 'await'],
  typescript: ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'switch', 'case', 'break', 'continue', 'class', 'new', 'try', 'catch', 'finally', 'import', 'export', 'from', 'async', 'await', 'interface', 'type', 'extends', 'implements'],
  python: ['def', 'return', 'if', 'elif', 'else', 'for', 'while', 'break', 'continue', 'class', 'import', 'from', 'as', 'try', 'except', 'finally', 'with', 'lambda', 'pass', 'True', 'False', 'None'],
  java: ['class', 'public', 'private', 'protected', 'static', 'void', 'int', 'long', 'double', 'boolean', 'new', 'return', 'if', 'else', 'for', 'while', 'switch', 'case', 'break', 'continue', 'try', 'catch', 'finally', 'import'],
  c: ['int', 'char', 'float', 'double', 'void', 'return', 'if', 'else', 'for', 'while', 'switch', 'case', 'break', 'continue', 'struct', 'typedef', 'include'],
  cpp: ['int', 'char', 'float', 'double', 'void', 'return', 'if', 'else', 'for', 'while', 'switch', 'case', 'break', 'continue', 'class', 'public', 'private', 'protected', 'template', 'typename', 'include', 'namespace'],
  go: ['func', 'package', 'import', 'return', 'if', 'else', 'for', 'range', 'switch', 'case', 'break', 'continue', 'struct', 'interface', 'go', 'defer', 'map', 'var', 'const'],
  rust: ['fn', 'let', 'mut', 'pub', 'impl', 'struct', 'enum', 'trait', 'match', 'if', 'else', 'for', 'while', 'loop', 'return', 'use', 'mod', 'crate'],
  sql: ['select', 'from', 'where', 'join', 'inner', 'left', 'right', 'on', 'group', 'by', 'order', 'limit', 'insert', 'into', 'values', 'update', 'set', 'delete', 'create', 'table'],
  json: [],
};

const normalizeLanguage = (className = '') => {
  const match = /language-([\w-]+)/.exec(className || '');
  if (!match) return 'plaintext';
  const lang = match[1].toLowerCase();
  if (lang === 'js') return 'javascript';
  if (lang === 'ts') return 'typescript';
  if (lang === 'py') return 'python';
  if (lang === 'c++') return 'cpp';
  return lang;
};

const renderHighlightedLine = (line, language, theme, lineKey) => {
  const isCommentLine =
    line.trim().startsWith('//') ||
    line.trim().startsWith('#') ||
    line.trim().startsWith('--');

  if (isCommentLine) {
    return <span key={`${lineKey}-comment`} className={theme === 'dark' ? 'text-emerald-400' : 'text-emerald-700'}>{line}</span>;
  }

  const keywords = LANGUAGE_KEYWORDS[language] || [];
  const keywordRegex = keywords.length ? new RegExp(`\\b(${keywords.join('|')})\\b`, language === 'sql' ? 'gi' : 'g') : null;
  const parts = line.split(/(".*?"|'.*?'|`.*?`)/g);

  return parts.map((part, idx) => {
    if (!part) return null;

    const isString = /^(".*?"|'.*?'|`.*?`)$/.test(part);
    if (isString) {
      return (
        <span key={`${lineKey}-str-${idx}`} className={theme === 'dark' ? 'text-amber-300' : 'text-amber-700'}>
          {part}
        </span>
      );
    }

    const withNumbers = part.split(/(\b\d+(?:\.\d+)?\b)/g).map((token, numberIdx) => {
      if (/^\b\d+(?:\.\d+)?\b$/.test(token)) {
        return (
          <span key={`${lineKey}-num-${idx}-${numberIdx}`} className={theme === 'dark' ? 'text-purple-300' : 'text-purple-700'}>
            {token}
          </span>
        );
      }
      return token;
    });

    if (!keywordRegex) {
      return <span key={`${lineKey}-plain-${idx}`}>{withNumbers}</span>;
    }

    const text = withNumbers.map((item) => (typeof item === 'string' ? item : `__jsx_${idx}__`)).join('');
    const splitByKeyword = text.split(keywordRegex);

    let jsxPointer = 0;
    return splitByKeyword.map((segment, segIdx) => {
      const keywordMatch = keywords.some((k) => k.toLowerCase() === segment.toLowerCase());
      if (segment.includes(`__jsx_${idx}__`)) {
        const restored = [];
        segment.split(`__jsx_${idx}__`).forEach((frag, fragIdx, arr) => {
          if (frag) restored.push(<span key={`${lineKey}-frag-${idx}-${segIdx}-${fragIdx}`}>{frag}</span>);
          if (fragIdx < arr.length - 1 && jsxPointer < withNumbers.length) {
            while (jsxPointer < withNumbers.length && typeof withNumbers[jsxPointer] === 'string') jsxPointer += 1;
            if (jsxPointer < withNumbers.length) {
              restored.push(withNumbers[jsxPointer]);
              jsxPointer += 1;
            }
          }
        });
        return <React.Fragment key={`${lineKey}-mix-${idx}-${segIdx}`}>{restored}</React.Fragment>;
      }

      return keywordMatch ? (
        <span key={`${lineKey}-kw-${idx}-${segIdx}`} className={theme === 'dark' ? 'text-sky-300' : 'text-sky-700'}>
          {segment}
        </span>
      ) : (
        <span key={`${lineKey}-txt-${idx}-${segIdx}`}>{segment}</span>
      );
    });
  });
};

const CodeBlock = ({ code, languageClassName, theme }) => {
  const [copied, setCopied] = useState(false);
  const language = normalizeLanguage(languageClassName);
  const rawCode = (code || '').replace(/\n$/, '');

  const handleCopyCode = async () => {
    if (!rawCode) return;
    await navigator.clipboard.writeText(rawCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="relative my-3">
      <button
        onClick={handleCopyCode}
        className={`absolute right-2 top-2 z-10 inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs ${
          theme === 'dark'
            ? 'bg-neutral-800/90 text-neutral-200 hover:bg-neutral-700'
            : 'bg-white/90 text-neutral-700 hover:bg-neutral-100 border border-neutral-300'
        }`}
        title="Copy code"
      >
        {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
        {copied ? 'Copied' : 'Copy'}
      </button>
      <pre
        className={`overflow-x-auto rounded-xl border p-4 text-sm ${
          theme === 'dark'
            ? 'border-neutral-700 bg-neutral-900 text-neutral-100'
            : 'border-neutral-300 bg-neutral-50 text-neutral-900'
        }`}
      >
        <code className="font-mono whitespace-pre">
          {rawCode.split('\n').map((line, lineIdx) => (
            <React.Fragment key={`line-${lineIdx}`}>
              {renderHighlightedLine(line, language, theme, `line-${lineIdx}`)}
              {lineIdx < rawCode.split('\n').length - 1 ? '\n' : ''}
            </React.Fragment>
          ))}
        </code>
      </pre>
    </div>
  );
};

const TableBlock = ({ children, theme }) => {
  const [copied, setCopied] = useState(false);
  const tableRef = useRef(null);

  const handleCopyTable = async () => {
    const content = tableRef.current?.innerText?.trim();
    if (!content) return;
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className={`relative my-4 overflow-x-auto rounded-xl border ${theme === 'dark' ? 'border-neutral-700' : 'border-neutral-300'}`}>
      <button
        onClick={handleCopyTable}
        className={`absolute right-2 top-2 z-10 inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs ${
          theme === 'dark'
            ? 'bg-neutral-800/90 text-neutral-200 hover:bg-neutral-700'
            : 'bg-white/90 text-neutral-700 hover:bg-neutral-100 border border-neutral-300'
        }`}
        title="Copy table"
      >
        {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
        {copied ? 'Copied' : 'Copy'}
      </button>
      <div ref={tableRef} className="pt-9">
        {children}
      </div>
    </div>
  );
};

const MessageItem = ({ message, messageIndex, onEditUserMessage, theme = 'dark' }) => {
  const isAssistant = message.role === 'assistant';
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!message.content) return;
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  if (isAssistant) {
    return (
      <div className={`py-6 ${theme === 'dark' ? 'text-neutral-100' : 'text-neutral-900'}`}>
        <div className="max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ ...props }) => (
                <h1 className={`mt-5 mb-3 text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`} {...props} />
              ),
              h2: ({ ...props }) => (
                <h2 className={`mt-4 mb-2 text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-black'}`} {...props} />
              ),
              h3: ({ ...props }) => (
                <h3 className={`mt-3 mb-2 text-lg font-semibold ${theme === 'dark' ? 'text-neutral-100' : 'text-neutral-900'}`} {...props} />
              ),
              p: ({ ...props }) => (
                <p className={`my-2 leading-7 ${theme === 'dark' ? 'text-neutral-200' : 'text-neutral-800'}`} {...props} />
              ),
              ul: ({ ...props }) => <ul className="my-2 ml-5 list-disc space-y-1" {...props} />,
              ol: ({ ...props }) => <ol className="my-2 ml-5 list-decimal space-y-1" {...props} />,
              li: ({ ...props }) => <li className={`${theme === 'dark' ? 'text-neutral-200' : 'text-neutral-800'}`} {...props} />,
              table: ({ ...props }) => (
                <TableBlock theme={theme}>
                  <table className="min-w-full text-sm" {...props} />
                </TableBlock>
              ),
              thead: ({ ...props }) => (
                <thead className={theme === 'dark' ? 'bg-neutral-800' : 'bg-neutral-100'} {...props} />
              ),
              th: ({ ...props }) => (
                <th
                  className={`px-3 py-2 text-left font-semibold ${theme === 'dark' ? 'text-neutral-100 border-neutral-700' : 'text-neutral-900 border-neutral-300'} border-b`}
                  {...props}
                />
              ),
              td: ({ ...props }) => (
                <td
                  className={`px-3 py-2 align-top ${theme === 'dark' ? 'text-neutral-200 border-neutral-800' : 'text-neutral-800 border-neutral-200'} border-b`}
                  {...props}
                />
              ),
              code: ({ inline, className, children, ...props }) => {
                if (inline) {
                  return (
                    <code
                      className={`rounded px-1.5 py-0.5 text-[0.9em] ${
                        theme === 'dark' ? 'bg-neutral-800 text-emerald-300' : 'bg-neutral-200 text-blue-700'
                      }`}
                      {...props}
                    >
                      {children}
                    </code>
                  );
                }
                return (
                  <CodeBlock
                    code={String(children)}
                    languageClassName={className}
                    theme={theme}
                    {...props}
                  />
                );
              },
              pre: ({ children }) => <>{children}</>,
              blockquote: ({ ...props }) => (
                <blockquote
                  className={`my-3 border-l-4 pl-3 italic ${
                    theme === 'dark' ? 'border-blue-500 text-neutral-300' : 'border-blue-600 text-neutral-700'
                  }`}
                  {...props}
                />
              ),
            }}
          >
            {message.content || ''}
          </ReactMarkdown>
        </div>
      </div>
    );
  }

  return (
    <div className="py-3 flex justify-end">
      <div className="max-w-[78%]">
        <div className={`rounded-full px-5 py-3 text-sm leading-relaxed ${
          theme === 'dark' ? 'bg-[#303030] text-neutral-100' : 'bg-neutral-200 text-neutral-900'
        }`}>
          {message.content}
        </div>
        <div className={`mt-2 flex justify-end gap-3 text-xs ${
          theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
        }`}>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1 hover:underline"
            title="Copy message"
          >
            {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
          <button
            onClick={() => onEditUserMessage && onEditUserMessage(messageIndex)}
            className="inline-flex items-center gap-1 hover:underline"
            title="Edit message"
          >
            <Pencil className="w-3 h-3" />
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
