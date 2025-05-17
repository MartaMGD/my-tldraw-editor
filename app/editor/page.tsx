'use client';

import EditorLayout from '@/components/Layouts/EditorLayout';
import { Tldraw } from 'tldraw';
import 'tldraw/tldraw.css';

export default function Editor() {
  return (
    <EditorLayout>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: '248px',
          right: 0,
          bottom: 0,
        }}
      >
        <Tldraw />
      </div>
    </EditorLayout>
  );
}
