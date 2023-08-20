import '@/styles/globals.css';
import '@fontsource/inter';
import Nav from '@/components/Nav';
import Provider from './Provider';
import Footer from '@/components/ui/Footer';

export const metadata = {
  title: 'Porikkha',
  description: 'Make Your Online Exams Secure and Intelligent',
};

const RootLayout = ({ children }: any) => {
  return (
    <html lang='en'>
      <body>
        <Provider>
          <div className='main'>
            <div className='gradient' />
          </div>

          <main className='app'>
            <Nav />
            {children}
          </main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
