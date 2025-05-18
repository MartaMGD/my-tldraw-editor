'use client';

import EditorLayout from '@/components/Layouts/EditorLayout';
import { Tldraw, Editor } from 'tldraw';
import 'tldraw/tldraw.css';
import { trpc } from '@/app/api/trpc/_trpc/client';
import { useRef, useCallback, useEffect, useState } from 'react';
import { LoadingPage } from '@/components/LoadingPage/LoadingPage';
import { randomizeProps } from '../utils/randomizeProps';
import { AlertCard } from '@/components/AlertCard/AlertCard';

export default function EditorPage() {
  const [showEmptyAlert, setShowEmptyAlert] = useState(false);

  const { data: snapshot, isLoading } = trpc.drawing.getDrawing.useQuery();

  const editorRef = useRef<Editor | null>(null);
  const utils = trpc.useUtils();

  const saveMutation = trpc.drawing.saveDrawing.useMutation({
    onSuccess: () => {
      utils.drawing.getDrawing.invalidate();
    },
  });

  const handleSaveManually = () => {
    const editor = editorRef.current;
    if (!editor) return;

    const currentShapes = editor.getCurrentPageShapes();
    if (currentShapes.length === 0) {
      setShowEmptyAlert(true);
      return;
    }
    setShowEmptyAlert(false);
    const snap = editor.store.getSnapshot();
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
        const randomColor = randomizeProps.color();
        const randomShape = randomizeProps.geoShape();

        if (shape.type === 'draw') {
          editor.deleteShape(shape.id);
          editor.createShapes([
            {
              type: 'geo',
              x: shape.x,
              y: shape.y,
              rotation: shape.rotation,
              props: {
                color: randomColor,
                fill: 'solid',
                dash: 'draw',
                geo: randomShape,
              },
            },
          ]);
        } else if (shape.type === 'geo') {
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
                geo: randomShape,
              },
            },
          ]);
        }
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
      <div className="fixed inset-y-0 left-[248px] right-0 flex flex-col">
        <div style={{ position: 'fixed', inset: 0 }}>
          <Tldraw persistenceKey="editor-doc" onMount={handleMount} />
        </div>
      </div>

      {showEmptyAlert && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50">
          <AlertCard title="Error" description="There must be a drawing to save" />
        </div>
      )}
    </EditorLayout>
  );
}
