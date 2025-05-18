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
    <NavigationMenu className="relative z-2 left-90 top-0 cursor-pointer">
      <NavigationMenuList className="flex">
        <NavigationMenuItem>
          <NavigationMenuTrigger asChild>
            <Button variant="outline">Options</Button>
          </NavigationMenuTrigger>
          <NavigationMenuContent className="w-36 bg-white border rounded shadow-md p-1">
            <div className="flex flex-col space-y-1">
              <Button
                onClick={handleSave}
                disabled={isLoading}
                variant="ghost"
                className="text-left cursor-pointer"
              >
                Save
              </Button>
              <Button onClick={handleLoad} variant="ghost" className="text-left cursor-pointer">
                Load
              </Button>

              <Button
                onClick={handleChangeShape}
                variant="ghost"
                className="text-left cursor-pointer"
              >
                Change shape
              </Button>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
