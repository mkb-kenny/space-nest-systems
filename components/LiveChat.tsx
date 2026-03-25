import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, User, Bot, RefreshCw, MessageSquare } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { CONTACT_INFO, OWNER_NAME, WEBSITE_PACKAGES, SYSTEM_PACKAGES, PORTFOLIO_ITEMS, ASSETS } from '../constants';

// Message Type Definition
interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

const LiveChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: `Hi there! 👋 I'm Jerome's virtual assistant. I can help you with pricing, service details, or tell you more about my work. How can I help you today?`,
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const chatSessionRef = useRef<any>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  // Initialize Chat Session with System Instruction
  const getChatSession = async () => {
    if (chatSessionRef.current) return chatSessionRef.current;

    // Construct the context from constants to feed the AI
    const contextData = {
      owner: OWNER_NAME,
      contact: CONTACT_INFO,
      services: {
        web: WEBSITE_PACKAGES,
        system: SYSTEM_PACKAGES
      },
      portfolioSample: PORTFOLIO_ITEMS.map(p => ({ title: p.title, category: p.category })),
    };

    const systemInstruction = `
      You are the SmartNest Assistant for ${OWNER_NAME}.
      Your goal is to professionally and enthusiastically answer questions about Jerome's web development and design services.
      
      Here is the data about Jerome and his business:
      ${JSON.stringify(contextData, null, 2)}

      Guidelines:
      1. Be friendly, concise, and professional. Use emojis sparingly.
      2. If asked about pricing, summarize the packages from the data provided.
      3. If asked about specific technologies, mention React, TypeScript, Next.js, and Node.js.
      4. If you don't know the answer, or if the user wants to hire Jerome immediately, suggest they email ${CONTACT_INFO.email} or use the 'WhatsApp' button in the chat header.
      5. Keep responses short (under 50 words) unless detailed technical info is requested.
      6. Do NOT make up facts not in the data.
    `;

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: systemInstruction,
        },
      });
      chatSessionRef.current = chat;
      return chat;
    } catch (error) {
      console.error("Failed to init Assistant", error);
      return null;
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newUserMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMsg]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const chat = await getChatSession();
      if (!chat) {
        throw new Error("Assistant Service Unavailable");
      }

      const result = await chat.sendMessageStream({ message: newUserMsg.text });
      
      let fullResponse = "";
      const modelMsgId = (Date.now() + 1).toString();
      
      // Add empty model message placeholder
      setMessages(prev => [...prev, {
        id: modelMsgId,
        role: 'model',
        text: '',
        timestamp: new Date()
      }]);

      for await (const chunk of result) {
        fullResponse += chunk.text;
        
        // Update the last message with the streaming text
        setMessages(prev => prev.map(msg => 
          msg.id === modelMsgId ? { ...msg, text: fullResponse } : msg
        ));
      }

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'model',
        text: "I'm having trouble connecting right now. Please email me directly!",
        timestamp: new Date()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const openWhatsApp = () => {
    const phoneNumber = CONTACT_INFO.phone.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${phoneNumber}`, '_blank');
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[60] flex flex-col items-end gap-3 sm:gap-4 pointer-events-none">
      
      {/* Chat Window */}
      <div className={`pointer-events-auto w-[calc(100vw-2rem)] sm:w-[380px] flex flex-col bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-100 dark:border-slate-800 transition-all duration-300 origin-bottom-right transform ${isOpen ? 'scale-100 opacity-100 translate-y-0 h-[calc(100vh-6rem)] sm:h-[500px]' : 'scale-90 opacity-0 translate-y-10 h-0 pointer-events-none'}`}>
          
          {/* Header */}
          <div className="bg-gradient-to-r from-brand-blue to-brand-green p-4 flex justify-between items-center text-white shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center font-bold text-white overflow-hidden shadow-inner border border-white/20">
                   {/* Avatar */}
                   {ASSETS.logoImage ? <img src={ASSETS.logoImage} className="w-full h-full object-cover" /> : <Bot size={20} />}
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-brand-green border-2 border-brand-blue rounded-full animate-pulse"></div>
              </div>
              <div>
                <h3 className="font-bold text-sm">SmartNest Assistant</h3>
                <p className="text-xs text-white/80 flex items-center gap-1"><span className="w-1.5 h-1.5 bg-brand-green rounded-full inline-block"></span> Always Online</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
               <button 
                  onClick={openWhatsApp}
                  title="Talk to Human (WhatsApp)"
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <MessageSquare size={18} />
                </button>
               <button onClick={toggleChat} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <X size={18} />
               </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 bg-gray-50 dark:bg-slate-950 overflow-y-auto overflow-x-hidden flex flex-col gap-4">
            
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex gap-3 max-w-[90%] ${msg.role === 'user' ? 'self-end flex-row-reverse' : 'self-start'}`}
              >
                 <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs ${msg.role === 'user' ? 'bg-brand-blue text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>
                    {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                 </div>
                 
                 <div className={`p-3 rounded-2xl text-sm leading-relaxed shadow-sm
                    ${msg.role === 'user' 
                      ? 'bg-brand-blue text-white rounded-tr-none' 
                      : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-gray-200 rounded-tl-none border border-gray-100 dark:border-slate-700'
                    }
                 `}>
                    {msg.text}
                 </div>
              </div>
            ))}

            {isTyping && (
              <div className="self-start flex gap-3 max-w-[90%] animate-fade-in-up">
                 <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300">
                    <Bot size={14} />
                 </div>
                 <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl rounded-tl-none border border-gray-100 dark:border-slate-700 flex gap-1 items-center h-10">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                 </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} className="p-3 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 flex gap-2 shrink-0">
            <textarea
              ref={inputRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 bg-gray-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/50 resize-none h-12 no-scrollbar"
              onKeyDown={(e) => {
                if(e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend(e);
                }
              }}
            />
            <button 
              type="submit"
              disabled={!inputMessage.trim() || isTyping}
              className="w-12 h-12 flex items-center justify-center bg-gradient-to-r from-brand-blue to-brand-green text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
            >
              {isTyping ? <RefreshCw size={18} className="animate-spin" /> : <Send size={18} />}
            </button>
          </form>
          
          <div className="bg-gray-50 dark:bg-slate-950 px-4 py-1.5 text-center border-t border-gray-100 dark:border-slate-800">
             <p className="text-[10px] text-gray-400 flex items-center justify-center gap-1">
               Secure Smart Conversation <Bot size={10} />
             </p>
          </div>
      </div>

      {/* Floating Toggle Button */}
      <button 
        onClick={toggleChat}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="pointer-events-auto group relative w-14 h-14 bg-gradient-to-r from-brand-blue to-brand-green hover:from-brand-green hover:to-brand-blue text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 z-50 hover:shadow-brand-green/30"
      >
         <MessageCircle size={26} className={`transition-all duration-300 ${isOpen ? 'scale-0 opacity-0 absolute' : 'scale-100 opacity-100'}`} />
         <X size={26} className={`transition-all duration-300 ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 absolute'}`} />
         
         {/* Notification Dot */}
         {!isOpen && (
            <span className="absolute top-0 right-0 flex h-4 w-4 -mt-1 -mr-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-brand-orange border-2 border-white dark:border-slate-900"></span>
            </span>
         )}
      </button>

    </div>
  );
};

export default LiveChat;