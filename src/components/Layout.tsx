import type { ReactNode } from 'react';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Cursor3D } from '@/components/Cursor3D';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-paper">
      <Cursor3D />
      <Nav />
      <main className="pt-16 sm:pt-20">{children}</main>
      <Footer />
    </div>
  );
}
