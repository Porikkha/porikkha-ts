// Use the client directive for using usePathname hook.
'use client';

// Use usePathname for catching route name.
import { usePathname } from 'next/navigation';
import Nav from '@/components/Nav';

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  console.log(
    '🚀 ~ file: NavLayoutProvider.tsx:10 ~ LayoutProvider ~ pathname:',
    pathname
  );
  return (
    <>
      {pathname !== '/dashboard' && <Nav />}
      {children}
    </>
  );
};
