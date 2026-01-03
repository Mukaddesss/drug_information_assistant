import { ArrowUp } from 'lucide-react';

interface ChatInputProps {
  input: string;
  setInput: (v: string) => void;
  onSend: () => void;
  isLoading: boolean;
}

export default function ChatInput({
  input,
  setInput,
  onSend,
  isLoading,
}: ChatInputProps) {
  return (
    <div className="w-full px-56 py-2 bg-transparent">
      <div
        className="
          flex items-center 
          backdrop-blur-xl bg-white/10 
          border border-white/20
          rounded-3xl px-5 py-3
          shadow-[0_4px_20px_rgba(0,0,0,0.25)]
          transition-all duration-300
          focus-within:shadow-[0_6px_25px_rgba(0,0,0,0.35)]
        "
      >
        <input
          className="
            flex-1 bg-transparent 
            text-blue-950 text-base
            px-2 py-2 
            outline-none 
            placeholder-gray-400 
          "
          placeholder="İlaç etkileşimi, doz, yan etki sor..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => (e.key === 'Enter' ? onSend() : null)}
          disabled={isLoading}
        />

        {/* Gönder Butonu */}
        <button
          onClick={onSend}
          disabled={isLoading}
          className="
            ml-3 p-3 rounded-full 
            bg-white/20
            font-bold
            text-pink-300
            shadow-md
            hover:shadow-lg 
            transition-all duration-300 
            hover:scale-110 
            active:scale-95
            disabled:opacity-50 disabled:scale-100
          "
        >
          <ArrowUp className="w-5 h-5 text-pink-300" />
        </button>
      </div>
    </div>
  );
}
