import type { ReactNode } from "react";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { useContentMode } from "@/content/contentMode";

const menuLinkClass =
  "text-sm font-semibold tracking-tight text-foreground/90 hover:text-foreground px-2 py-2";

function MenuLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className={menuLinkClass}>
      {children}
    </a>
  );
}

export function MainNav() {
  const { mode, toggleMode, content } = useContentMode();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-20 items-center justify-between gap-6">
        <a href="/" className="flex items-center gap-3">
          <img src={content.LOGO_IMAGE_SRC} alt={content.LOGO_IMAGE_ALT} className="h-10 w-auto" />
        </a>

        <nav className="hidden items-center gap-2 lg:flex">
          {content.NAV_MENU_LABELS.slice(0, 6).map((label) => (
            <MenuLink key={label} href="#">
              {label}
            </MenuLink>
          ))}

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-sm font-semibold tracking-tight text-foreground/90 hover:bg-accent hover:text-accent-foreground">
                  {content.NAV_MORE_TRIGGER}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="rounded-md border bg-popover p-3 text-popover-foreground shadow-lg">
                  <div className="grid w-[260px] gap-2">
                    <NavigationMenuLink asChild>
                      <a className="rounded-md px-3 py-2 text-sm hover:bg-accent" href="#">
                        {content.NAV_MORE_LABELS[0]}
                      </a>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <a className="rounded-md px-3 py-2 text-sm hover:bg-accent" href="#">
                        {content.NAV_MORE_LABELS[1]}
                      </a>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <a className="rounded-md px-3 py-2 text-sm hover:bg-accent" href="#">
                        {content.NAV_MORE_LABELS[2]}
                      </a>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <MenuLink href="#">{content.NAV_MENU_LABELS[6]}</MenuLink>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 lg:flex">
            <span className="text-xs font-semibold text-muted-foreground">{"{{...}}"}</span>
            <Switch checked={mode === "real"} onCheckedChange={toggleMode} aria-label="Toggle content mode" />
            <span className="text-xs font-semibold text-muted-foreground">Real</span>
          </div>

          <Button variant="secondary" className="hidden lg:inline-flex">
            {content.CTA_TEXT_1}
          </Button>

          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Open menu">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>

                <div className="mt-6 grid gap-2">
                  {[
                    ...content.NAV_MENU_LABELS.slice(0, 6),
                    content.NAV_MORE_TRIGGER,
                    content.NAV_MENU_LABELS[6],
                  ].map((label, idx) => (
                    <a key={`${idx}-${label}`} className="rounded-md px-3 py-2 text-sm font-semibold hover:bg-accent" href="#">
                      {label}
                    </a>
                  ))}
                  <div className="pt-2">
                    <Button variant="secondary" className="w-full">
                      {content.CTA_TEXT_1}
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
