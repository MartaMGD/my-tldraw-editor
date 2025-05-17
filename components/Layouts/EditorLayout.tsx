import {  ReactNode } from 'react';
import { Tldraw } from 'tldraw';
import OptionMenu from '../OptionMenu/OptionMenu';

export default function EditorLayout({ children }: { children?: ReactNode }) {
  return (
    <div className="flex h-screen">
      <aside className="w-48 p-4">
        <OptionMenu/>
      </aside>

      <main className="flex-1 relative">
        <div style={{ position: 'fixed', inset: 0, left: '192px' }}>
          <Tldraw/>
        </div>
        {children}
      </main>
    </div>
  );
}
