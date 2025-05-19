import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@radix-ui/react-navigation-menu';
import { Button } from '../ui/button';

interface OptionMenuProps {
  handleSave: () => void;
  handleLoad: () => void;
  handleChangeShape: () => void;
  isLoading?: boolean;
}

export default function OptionMenu({
  handleSave,
  handleLoad,
  handleChangeShape,
  isLoading,
}: OptionMenuProps) {
  return (
    <div className="w-full flex flex-row relative z-20 left-2 top-12 cursor-pointer gap-2">
      <Button
        onClick={handleSave}
        disabled={isLoading}
        variant="outline"
        className="text-left cursor-pointer"
      >
        Save
      </Button>
      <Button onClick={handleLoad} variant="outline" className="text-left cursor-pointer">
        Load
      </Button>

      <Button onClick={handleChangeShape} variant="outline" className="text-left cursor-pointer">
        Change
      </Button>
    </div>
  );
}
