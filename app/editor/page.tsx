'use client';

import EditorLayout from '@/components/Layouts/EditorLayout';
import { Tldraw, Editor, TLAssetId } from 'tldraw';
import 'tldraw/tldraw.css';
import { trpc } from '@/app/api/trpc/_trpc/client';
import { useRef, useCallback, useEffect, useState } from 'react';
import { LoadingPage } from '@/components/LoadingPage/LoadingPage';
import { randomizeProps } from '../utils/randomizeProps';
import { AlertCard } from '@/components/AlertCard/AlertCard';

export default function EditorPage() {
  const [showEmptyAlert, setShowEmptyAlert] = useState(false);
  const { data: snapshot, isLoading: isLoadingGetImage } = trpc.drawing.getDrawing.useQuery();

  const { mutateAsync: saveMutation, isPending: isPendingSaveMutation } =
    trpc.drawing.saveDrawing.useMutation();

  const {
    mutateAsync: generateImageMutation,
    isPending: isPendingGenerateImage,
    error: isErrorGenerateImage,
  } = trpc.drawing.generateImage.useMutation();

  const editorRef = useRef<Editor | null>(null);
  const utils = trpc.useUtils();

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
    saveMutation(snap);
  };

  const handleReloadManually = async () => {
    if (!editorRef.current) return;
    const storedDrawing = await utils.drawing.getDrawing.fetch();
    if (storedDrawing) editorRef.current.loadSnapshot(storedDrawing);
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

  const handleGenerateImageManually = async (data: { prompt: string }) => {
    const { prompt } = data;
    const editor = editorRef.current;

    if (!prompt.trim() || !editor) return;

    try {
      const { base64Image } = await generateImageMutation({ prompt });
      if (!base64Image) return;

      const assetId = `asset:image:${Date.now()}`;

      editor.store.put([
        {
          id: assetId as TLAssetId,
          typeName: 'asset',
          type: 'image',
          meta: {},
          props: {
            src: base64Image,
            w: 256,
            h: 256,
            name: `generated-image-${Date.now()}.webp`,
            mimeType: 'image/webp',
            isAnimated: false,
          },
        },
      ]);

      const { x, y } = editor.getViewportPageBounds().center;

      editor.createShape({
        type: 'image',
        x: x - 128,
        y: y - 128,
        props: {
          assetId,
          w: 256,
          h: 256,
        },
      });
    } catch (err) {
      isErrorGenerateImage && <AlertCard title="Error" description="Error while loading image" />;
    }
  };

  const handleMount = useCallback((editor: Editor) => {
    editorRef.current = editor;
  }, []);

  useEffect(() => {
    if (snapshot && editorRef.current) editorRef.current.loadSnapshot(snapshot);
  }, [snapshot]);

  return (
    <EditorLayout
      handleSave={handleSaveManually}
      handleLoad={handleReloadManually}
      handleChangeShape={handleChangeShapeManually}
      handleGenerateImage={handleGenerateImageManually}
      isLoading={isPendingSaveMutation}
    >
      <div className="fixed inset-y-0 left-[248px] right-0 flex flex-col">
        <div style={{ position: 'fixed', inset: 0 }}>
          <Tldraw persistenceKey="editor-doc" onMount={handleMount} />
        </div>
      </div>

      {showEmptyAlert && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50">
          <AlertCard title="Error" description="Error: Unable to save image" />
        </div>
      )}
      {isLoadingGetImage ? (
        <LoadingPage
          bgColor="bg-slate-900"
          textColor="text-white"
          message={'Unpacking watercolors and preparing canvas...'}
        />
      ) : isPendingGenerateImage ? (
        <LoadingPage
          bgColor="bg-white"
          opacity="opacity-50"
          textColor="text-black"
          message={'Generating image with magic...'}
        />
      ) : null}
    </EditorLayout>
  );
}
