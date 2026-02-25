// src/pages/solutions/ChatPage.jsx
import React from 'react';
import ChatInterface from '../../components/chat/ChatInterface';

/**
 * ChatPage Component
 * This is the main container for the AI Chat application.
 * It uses the ChatInterface component to provide a full-screen, 
 * glassmorphism-themed chat experience.
 */
export default function ChatPage() {
  return (
    <div className="h-screen w-full relative overflow-hidden">
      <ChatInterface />
    </div>
  );
}
