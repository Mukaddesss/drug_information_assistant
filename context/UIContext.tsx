'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface UIContextProps {
  isHistoryOpen: boolean;
  toggleHistory: () => void;
}

const UIContext = createContext<UIContextProps | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const toggleHistory = () => setIsHistoryOpen((prev) => !prev);

  return (
    <UIContext.Provider value={{ isHistoryOpen, toggleHistory }}>
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error('useUI must be used inside UIProvider');
  return ctx;
}
