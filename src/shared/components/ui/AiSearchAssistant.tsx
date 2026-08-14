'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, X, Bot, User } from 'lucide-react';

export function AiSearchAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    {
      role: 'assistant',
      content:
        '**👋 Приветствуем вас в Велес Вояж!**\n\n✨ Ваш персональный AI-ассистент готов помочь с планированием идеального путешествия!\n\n📍 **Что я могу для вас сделать:**\n• 🌍 Рассказать о любой стране мира\n• 🛂 Подробно объяснить визовые требования\n• 🏛️ Познакомить с достопримечательностями\n• 🗓️ Помочь спланировать маршрут\n• 💰 Подобрать оптимальный бюджет\n\n📞 **Наши контакты:**\n• 📱 Телефон: +7 985 063-51-34\n• 💬 Telegram: @Anastasiiiiyyaa\n• 🌐 Сайт: https://veles-voyage.ru/\n\n💡 *Спросите меня о чем угодно – я всегда на связи!*',
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const handleToggle = () => setIsOpen(prev => !prev);
    window.addEventListener('toggle-ai-assistant', handleToggle);
    return () => window.removeEventListener('toggle-ai-assistant', handleToggle);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();
      const reply = data.reply || 'Извините, не удалось получить ответ.';
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'К сожалению, произошла ошибка при получении ответа. Пожалуйста, свяжитесь с нашим менеджером по телефону +7 985 063-51-34 или в Telegram (@Anastasiiiiyyaa или @veles_voyage) для получения помощи.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isOpen && (
        <>
          {/* Mobile overlay for closing */}
          <div 
            className="sm:hidden fixed inset-0 bg-black/30 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          <div className="fixed inset-0 sm:inset-auto sm:bottom-24 sm:left-6 w-full h-full sm:w-[350px] sm:h-[500px] bg-white dark:bg-gray-900 rounded-none sm:rounded-2xl shadow-2xl z-50 flex flex-col border border-gray-200 dark:border-gray-800 overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
            <div className="p-3 sm:p-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Bot className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-semibold text-sm sm:text-base">Велес Вояж AI</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 p-1 rounded-full transition-colors"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-gray-50/50 dark:bg-gray-950/50"
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-[80%] p-2.5 sm:p-3 rounded-2xl text-xs sm:text-sm ${
                      m.role === 'user'
                        ? 'bg-blue-600 text-white rounded-tr-none'
                        : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-tl-none shadow-sm'
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-1 opacity-70">
                      {m.role === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                      <span className="text-[10px] uppercase font-bold tracking-wider">
                        {m.role === 'user' ? 'Вы' : 'Велес AI'}
                      </span>
                    </div>
                    {m.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex space-x-1">
                      <div
                        className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full animate-bounce"
                        style={{ animationDelay: '0ms' }}
                      />
                      <div
                        className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full animate-bounce"
                        style={{ animationDelay: '150ms' }}
                      />
                      <div
                        className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full animate-bounce"
                        style={{ animationDelay: '300ms' }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-3 sm:p-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950"
            >
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Спросите что-нибудь..."
                  className="w-full pl-3 sm:pl-4 pr-10 sm:pr-12 py-2.5 sm:py-3 bg-gray-100 dark:bg-gray-900 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 transition-all dark:text-gray-200"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="absolute right-1.5 sm:right-2 top-1 p-1 sm:top-1.5 sm:p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
}
