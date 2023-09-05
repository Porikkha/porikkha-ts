// Use the client directive for using usePathname hook.
'use client';

// Use usePathname for catching route name.
import { usePathname } from 'next/navigation';
import Nav from '@/components/Nav';
import { showNavBar } from '@/utils/navChecker';

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  return (
    <>
      {!showNavBar(pathname) && <Nav />}
      {children}
    </>
  );
};
