import ChatMessage from './ChatMessage';
import { Message } from '@/data/types';

interface ChatWindowProps {
  messages: Message[];
  isLoading: boolean;
}

export default function ChatWindow({ messages, isLoading }: ChatWindowProps) {
  return (
    <div className="flex-1 overflow-y-auto p-0.5  px-56">
      {messages.map((msg, i) => (
        <ChatMessage key={i} from={msg.from} text={msg.text} />
      ))}

      {isLoading && (
        <div className="text-gray-400 text-sm p-2">Yanıt hazırlanıyor...</div>
      )}
    </div>
  );
}
