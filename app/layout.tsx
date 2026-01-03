import { AuthProvider } from '@/context/AuthContext';
import { UIProvider } from '@/context/UIContext';
import './globals.css';

export const metadata = {
  title: 'İlaç Bilgi Asistanı',
  description: 'FDA verileri ile güçlendirilmiş ilaç bilgi chatbot',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body>
        <div className="bg-[#ffeef3]">
          <AuthProvider>
            <UIProvider>{children}</UIProvider>
          </AuthProvider>
        </div>
        
      </body>
    </html>
  );
}
