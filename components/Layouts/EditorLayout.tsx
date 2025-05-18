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
    <>
      <header className=" border-b bg-white shadow-sm flex justify-start">
        <OptionMenu
          handleSave={handleSave}
          handleLoad={handleLoad}
          handleChangeShape={handleChangeShape}
          isLoading={isLoading}
        />
      </header>

      <main className="flex-1 relative overflow-hidden">{children}</main>
    </>
  );
}
