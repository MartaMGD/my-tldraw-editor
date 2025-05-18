'use client';

import EditorLayout from '@/components/Layouts/EditorLayout';
import { Tldraw, Editor } from 'tldraw';
import 'tldraw/tldraw.css';

import { trpc } from '@/app/api/trpc/_trpc/client';
import { useRef, useCallback, useEffect } from 'react';
import { LoadingPage } from '@/components/LoadingPage/LoadingPage';
import { randomizeColor } from '../utils/randomizeColor';

export default function EditorPage() {
  const { data: snapshot, isLoading } = trpc.drawing.getDrawing.useQuery();
  const editorRef = useRef<Editor | null>(null);
  const utils = trpc.useUtils();

  const saveMutation = trpc.drawing.saveDrawing.useMutation({
    onSuccess: () => {
      utils.drawing.getDrawing.invalidate();
    },
  });

  const handleSaveManually = () => {
    if (!editorRef.current) return;
    const snap = editorRef.current.store.getSnapshot();

    saveMutation.mutate(snap);
  };

  const handleReloadManually = async () => {
    if (!editorRef.current) return;
    const storedDrawing = await utils.drawing.getDrawing.fetch();
    if (storedDrawing) {
      editorRef.current.loadSnapshot(storedDrawing);
    }
  };

  const handleChangeShapeManually = () => {
    const editor = editorRef.current;
    if (!editor) return;

    const selectedShapes = editor.getSelectedShapes();
    if (selectedShapes.length === 0) return;

    editor.run(() => {
      selectedShapes.forEach((shape) => {
        const randomColor = randomizeColor();
        editor.updateShapes([
          {
            id: shape.id,
            type: shape.type,
            x: shape.x,
            y: shape.y,
            rotation: shape.rotation,
            props: {
              ...shape.props,
              color: randomColor,
              fill: 'solid',
              dash: 'draw',
            },
          },
        ]);
      });
    });
  };

  const handleMount = useCallback((editor: Editor) => {
    editorRef.current = editor;
  }, []);

  useEffect(() => {
    if (snapshot && editorRef.current) {
      editorRef.current.loadSnapshot(snapshot);
    }
  }, [snapshot]);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <EditorLayout
      handleSave={handleSaveManually}
      handleLoad={handleReloadManually}
      handleChangeShape={handleChangeShapeManually}
      isLoading={saveMutation.isPending}
    >
      <div
        className="flex flex-col"
        style={{
          position: 'fixed',
          top: 0,
          left: '248px',
          right: 0,
          bottom: 0,
        }}
      >
        <div style={{ position: 'fixed', inset: 0 }}>
          <Tldraw persistenceKey="editor-doc" onMount={handleMount} />
        </div>
      </div>
    </EditorLayout>
  );
}
