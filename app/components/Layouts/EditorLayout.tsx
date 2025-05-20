import { ReactNode } from 'react';
import OptionMenu from '@components/OptionMenu/OptionMenu';
import { GenerateImageInputForm } from '@components/ImageGeneratorForm/ImageGeneratorForm';

interface EditorLayoutProps {
  children: ReactNode;
  handleSave: () => void;
  handleLoad: () => void;
  handleChangeShape: () => void;
  handleGenerateImage: (data: { prompt: string }) => void;
  isLoading?: boolean;
}

export default function EditorLayout({
  children,
  handleSave,
  handleLoad,
  handleChangeShape,
  handleGenerateImage,
  isLoading,
}: EditorLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex justify-start border-b bg-white shadow-sm">
        <OptionMenu
          handleSave={handleSave}
          handleLoad={handleLoad}
          handleChangeShape={handleChangeShape}
          isLoading={isLoading}
        />
        <GenerateImageInputForm handleGenerateImage={handleGenerateImage} />
      </header>
      <main className="flex-grow relative overflow-auto p-4">{children}</main>
    </div>
  );
}
