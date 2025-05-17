import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "@radix-ui/react-navigation-menu"


export default function OptionMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Options</NavigationMenuTrigger>
          <NavigationMenuContent className="w-48">
            <div className="flex flex-col space-y-1 p-2">
              <button
          
                className="px-3 py-2 rounded hover:bg-gray-100 text-sm text-gray-700 text-left"
              >
                Save
              </button>
              <button
                className="px-3 py-2 rounded hover:bg-gray-100 text-sm text-gray-700 text-left"
              >
                Load
              </button>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
