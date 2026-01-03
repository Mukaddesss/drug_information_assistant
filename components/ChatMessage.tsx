interface ChatMessageProps {
  from: 'user' | 'assistant';
  text: string;
}

export default function ChatMessage({ from, text }: ChatMessageProps) {
  const isUser = from === 'user';

  return (
    <div
      className={`w-full flex ${isUser ? 'justify-end' : 'justify-start'} my-3`}
    >
      {!isUser && (
        <p className="max-w-[99%] text-[15px] leading-relaxed text-[#0A1A3D] whitespace-pre-wrap">
          {text}
        </p>
      )}

      {isUser && (
        <div
          className="
            max-w-[70%]
            bg-white/10
            text-[#0A1A3D]
            px-4 py-2
            rounded-2xl
            shadow-md
            
            text-[15px]
            leading-relaxed
            whitespace-pre-wrap
          "
        >
          {text}
        </div>
      )}
    </div>
  );
}
