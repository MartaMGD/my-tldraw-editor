import { ReactNode } from 'react';
import OptionMenu from '../OptionMenu/OptionMenu';

interface EditorLayoutProps {
  children: ReactNode;
  handleSave: () => void;
  handleLoad: () => void;
  handleChangeShape: () => void;
  isLoading?: boolean;
}

export default function EditorLayout({
  children,
  handleSave,
  handleLoad,
  handleChangeShape,
  isLoading,
}: EditorLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className=" border-b bg-white shadow-sm flex justify-start">
        <OptionMenu
          handleSave={handleSave}
          handleLoad={handleLoad}
          handleChangeShape={handleChangeShape}
          isLoading={isLoading}
        />
      </header>
      <main className="flex-grow relative overflow-auto p-4">{children}</main>
    </div>
  );
}
