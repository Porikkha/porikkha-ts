'use client';
import '@/styles/globals.css';
import '@fontsource/inter';
import { LayoutProvider } from './LayoutProvider';
import Provider from './Provider';
import Footer from '@/components/ui/Footer';
import { usePathname } from 'next/navigation';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const RootLayout = ({ children }: any) => {
  const pathname = usePathname();
  return (
    <html lang='en'>
      <body>
        <Provider>
          <div className='main'>
            <div className='gradient' />
          </div>
          <main className={pathname === '/dashboard' ? 'dashboard' : 'app'}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <LayoutProvider>{children}</LayoutProvider>
            </LocalizationProvider>
          </main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
