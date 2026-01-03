'use client';

import { useUI } from '@/context/UIContext';
import { ChevronLeft, ChevronRight, SquarePen, History } from 'lucide-react';
import { Chat } from '@/lib/supabase';
import Image from 'next/image';

interface SidebarProps {
  chats: Chat[];
  currentChatId: string | null;
  onChatSelect: (chatId: string) => void;
  onNewChat: () => void;
}

export default function SideBar({
  chats,
  currentChatId,
  onChatSelect,
  onNewChat,
}: SidebarProps) {
  const { isHistoryOpen, toggleHistory } = useUI();

  const PRIMARY_COLOR = 'text-[#5F001D]';
  const NEW_CHAT_BG = 'bg-[#FCE7F6]';

  return (
    <div
      className={`h-full z-50 bg-transparent backdrop-blur-sm border-r-2 border-white
      transition-all duration-300 flex flex-col pt-4 pb-4 ${
        isHistoryOpen ? 'w-80' : 'w-20'
      }`}
    >
      {/* ÜST BAR */}
      <div
        className={`${
          isHistoryOpen
            ? 'flex justify-between items-center px-4'
            : 'flex flex-col items-center gap-4'
        }`}
      >
        {/* KAPALIYKEN: Toggle ÜSTTE */}
        {!isHistoryOpen && (
          <button
            onClick={toggleHistory}
            className={`p-1 border-2 border-white rounded-lg ${PRIMARY_COLOR} hover:bg-gray-200/70 transition`}
          >
            <ChevronRight size={22} />
          </button>
        )}

        {/* KAPALIYKEN: Yeni Sohbet ALTTA */}
        {!isHistoryOpen && (
          <button
            onClick={onNewChat}
            className={`p-1 border-2 border-white rounded-lg hover:bg-gray-100 ${PRIMARY_COLOR} transition shadow-md`}
          >
            <SquarePen size={22} strokeWidth={1.8} />
          </button>
        )}

        {/* AÇIKKEN: Yeni Sohbet SOLDA */}
        {isHistoryOpen && (
          <button
            onClick={onNewChat}
            className={`flex-1 mr-3 ${PRIMARY_COLOR} border border-pink-300 py-2 px-4 rounded-full font-medium flex items-center justify-center gap-2 transition-all hover:bg-gray-100/50`}
          >
            <SquarePen size={20} />
            Yeni Sohbet
          </button>
        )}

        {/* AÇIKKEN: Toggle SAĞDA */}
        {isHistoryOpen && (
          <button
            onClick={toggleHistory}
            className={`p-2 rounded-full ${PRIMARY_COLOR} hover:bg-gray-200/70 transition`}
          >
            <ChevronLeft size={22} />
          </button>
        )}
      </div>

      {/* AÇIKKEN İÇERİK */}
      {isHistoryOpen && (
        <div className="flex flex-col h-full pt-6 px-4">
          <h2
            className={`${PRIMARY_COLOR} text-sm font-bold tracking-wider mb-3 flex items-center gap-2 uppercase border-b border-gray-200 pb-2`}
          >
            <History size={16} /> Geçmiş Sohbetler
          </h2>

          <div className="space-y-2 overflow-y-auto flex-1 pr-2">
            {chats.length === 0 && (
              <p className="text-gray-500 text-sm italic">
                Henüz kaydedilmiş sohbet yok.
              </p>
            )}

            {chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => onChatSelect(chat.id)}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${PRIMARY_COLOR} ${
                  currentChatId === chat.id
                    ? `bg-[#FCE7F6] font-semibold text-gray-800 shadow-sm border border-pink-200`
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate">{chat.title}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(chat.created_at).toLocaleDateString('tr-TR', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* KAPALI İKEN ALAN (toggle ve yeni sohbet zaten yukarı taşındı) */}
      {!isHistoryOpen && <div className="mt-4"></div>}
    </div>
  );
}
