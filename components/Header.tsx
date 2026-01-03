'use client';

import { useState } from 'react';
import { User } from 'lucide-react';
import Image from 'next/image';

interface HeaderProps {
  userEmail: string;
  onLogout: () => void;
}

export default function Header({ userEmail, onLogout }: HeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative bg-white/20 p-3 text-[#81544c] font-serif flex items-center justify-between shadow-md shadow-pink-300 ">
      {/* Orta: Başlık */}
      <h2 className="text-center flex-1 text-3xl font-bold"  >
          DRUG INFORMATION ASSISTANT 
        
      </h2>

      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 px-3 py-2 bg-pink-300 text-white rounded-full hover:bg-[#4d3732] transition shadow"
        >
          <User className="w-5 h-5" />
        </button>

        {/* Dropdown Menü */}
        {open && (
          <div className="absolute right-0 mt-2 w-48 bg-white/10 text-red-900 rounded-xl shadow-lg overflow-hidden border border-white/10">
            <div className="px-3 py-2 border-b border-white/10 text-md opacity-80">
              {userEmail}
            </div>

            <button
              onClick={onLogout}
              className="w-full text-left px-3 py-2 text-red-900 hover:bg-[#4d3732] transition"
            >
              Çıkış Yap
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
