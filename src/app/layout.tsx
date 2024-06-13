import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import '@/styles/reset.css';
import '@/styles/globals.css';
import { ReactQueryClientProvider } from '@/libs/ReactQueryClientProvider';
import { Provider } from 'jotai';

const notoSansKR = Noto_Sans_KR({ subsets: ['latin'], variable: '--font-noto' });

export const metadata: Metadata = {
  title: 'PeTodo App',
  description: 'Pet Care To-Do App',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClientProvider>
      <html lang="en">
        <link rel="icon" href="/PTDLogo.png" sizes="any" />
        <Provider>
          <body className={notoSansKR.className}>
            <div id="modal-root"></div>
            <div className="w-mobile h-mobile bg-white">{children}</div>
          </body>
        </Provider>
      </html>
    </ReactQueryClientProvider>
  );
}
