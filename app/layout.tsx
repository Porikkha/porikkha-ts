'use client';
import '@/styles/globals.css';
import '@fontsource/inter';
import { LayoutProvider } from './LayoutProvider';
import Provider from './Provider';
import Footer from '@/components/ui/Footer';
import { usePathname } from 'next/navigation';
import { showNavBar } from '@/utils/navChecker';

const RootLayout = ({ children }: any) => {
  const pathname = usePathname();
  return (
    <html lang='en'>
      <body>
        <Provider>
          <div className='main'>
            <div className='gradient' />
          </div>

          <main className={showNavBar(pathname) ? 'dashboard' : 'app'}>
            <LayoutProvider>{children}</LayoutProvider>
          </main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
