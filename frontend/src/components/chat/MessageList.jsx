import React, { useEffect, useRef, useCallback } from 'react';
import MessageItem from './MessageItem';
import { motion, AnimatePresence } from 'framer-motion';

const MessageList = ({ messages, isLoading, onEditUserMessage, theme = 'dark' }) => {
  const bottomRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  return (
    <div className="flex-1 overflow-y-auto px-6 pb-40 pt-6 custom-scrollbar">
      <div className="mx-auto w-full max-w-3xl">
        <AnimatePresence initial={false}>
          {messages.map((msg, index) => (
            <motion.div
              key={msg.id || `${msg.role}-${index}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              layout
            >
              <MessageItem
                message={msg}
                messageIndex={index}
                onEditUserMessage={onEditUserMessage}
                theme={theme}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        <div ref={bottomRef} className="h-1" />
      </div>
    </div>
  );
};

export default MessageList;
