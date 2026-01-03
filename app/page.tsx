'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase, Chat, Message as DBMessage } from '@/lib/supabase';
import { Message } from '@/data/types';
import ChatInput from '@/components/ChatInput';
import ChatWindow from '@/components/ChatWindow';
import Header from '@/components/Header';
import SideBar from '@/components/Sidebar';
import Auth from '@/components/Auth';

export default function Home() {
  const { user, loading: authLoading, logout } = useAuth();
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setLoading] = useState(false);

  // Kullanıcı değiştiğinde chatları yükle
  useEffect(() => {
    if (user) {
      loadChats();
    } else {
      setChats([]);
      setMessages([]);
      setCurrentChatId(null);
    }
  }, [user]);

  // Chatları yükle
  const loadChats = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('chats')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setChats(data || []);
    } catch (err) {
      console.error('Chatlar yüklenemedi:', err);
    }
  };

  // Belirli bir chat'in mesajlarını yükle
  const loadChatMessages = async (chatId: string) => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('chat_id', chatId)
        .order('created_at', { ascending: true });

      if (error) throw error;

      const loadedMessages: Message[] = data.map((msg: DBMessage) => ({
        from: msg.role === 'user' ? 'user' : 'assistant',
        text: msg.content,
      }));

      setMessages(loadedMessages);
      setCurrentChatId(chatId);
    } catch (err) {
      console.error('Mesajlar yüklenemedi:', err);
    }
  };

  // Chat seç
  const handleChatSelect = (chatId: string) => {
    loadChatMessages(chatId);
  };

  // Yeni sohbet başlat
  const handleNewChat = () => {
    setCurrentChatId(null);
    setMessages([]);
  };

  // Mesaj gönder
  const sendMessage = async () => {
    if (!input.trim() || !user) return;

    const userMessage = input;
    setMessages((prev) => [...prev, { from: 'user', text: userMessage }]);
    setInput('');
    setLoading(true);

    try {
      // Backend'e mesaj gönder
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          user_id: user.id,
        }),
      });

      const data = await response.json();
      const botResponse = data.reply || 'Cevap alınamadı.';

      setMessages((prev) => [
        ...prev,
        { from: 'assistant', text: botResponse },
      ]);

      // Supabase'e kaydet
      let chatId = currentChatId;

      if (!chatId) {
        // Yeni chat oluştur
        const { data: newChat, error: chatError } = await supabase
          .from('chats')
          .insert({
            user_id: user.id,
            title: userMessage.slice(0, 50),
          })
          .select()
          .single();

        if (chatError) throw chatError;
        chatId = newChat.id;
        setCurrentChatId(chatId);
        await loadChats();
      } else {
        // Mevcut chat'in updated_at'ini güncelle
        await supabase
          .from('chats')
          .update({ updated_at: new Date().toISOString() })
          .eq('id', chatId);
      }

      // Mesajları kaydet
      await supabase.from('messages').insert([
        { chat_id: chatId, role: 'user', content: userMessage },
        { chat_id: chatId, role: 'assistant', content: botResponse },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { from: 'assistant', text: '⚠️ Sunucuya bağlanılamadı.' },
      ]);
    }

    setLoading(false);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#ffeef3] ">
        <div className="text-2xl text-gray-600">⏳ Loading...</div>
      </div>
    );
  }

  // Kullanıcı giriş yapmamışsa
  if (!user) {
    return <Auth />;
  }

  // Ana chat ekranı
  return (
    <div className="flex h-screen">
      <SideBar
        chats={chats}
        currentChatId={currentChatId}
        onChatSelect={handleChatSelect}
        onNewChat={handleNewChat}
      />
      <div></div>
      <div className="flex-1 flex flex-col">
         
        <Header userEmail={user?.email ?? 'Misafir'} onLogout={logout} />

        <ChatWindow messages={messages} isLoading={isLoading} />

        <ChatInput
          input={input}
          setInput={setInput}
          onSend={sendMessage}
          isLoading={isLoading}
        />
      
      </div>
    
    </div>
  );
}
