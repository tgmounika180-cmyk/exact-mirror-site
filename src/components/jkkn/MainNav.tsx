import type { ReactNode } from "react";
import { Menu } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

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
import jkknLogo from "@/assets/jkkn-logo.svg";
import { fetchSiteNavLabels } from "@/lib/jkkn/content";

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
  const navQ = useQuery({ queryKey: ["site", "nav-labels"], queryFn: fetchSiteNavLabels });
  const labels = (navQ.data ?? []).reduce<Record<string, string>>((acc, row) => {
    acc[row.key] = row.label;
    return acc;
  }, {});

  const L = (key: string, fallback: string) => labels[key] || fallback;

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-20 items-center justify-between gap-6">
        <a href="/" className="flex items-center gap-3">
          <img src={jkknLogo} alt="JKKN Institutions" className="h-10 w-auto" />
        </a>

        <nav className="hidden items-center gap-2 lg:flex">
          <MenuLink href="#">{L("home", "Home")}</MenuLink>
          <MenuLink href="#">{L("about", "About")}</MenuLink>
          <MenuLink href="#">{L("our_colleges", "Our Colleges")}</MenuLink>
          <MenuLink href="#">{L("our_schools", "Our Schools")}</MenuLink>
          <MenuLink href="#">{L("courses_offered", "Courses Offered")}</MenuLink>
          <MenuLink href="#">{L("facilities", "Facilities")}</MenuLink>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-sm font-semibold tracking-tight text-foreground/90 hover:bg-accent hover:text-accent-foreground">
                  {L("more", "More")}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="rounded-md border bg-popover p-3 text-popover-foreground shadow-lg">
                  <div className="grid w-[260px] gap-2">
                    <NavigationMenuLink asChild>
                      <a className="rounded-md px-3 py-2 text-sm hover:bg-accent" href="#">
                        {L("more_news_events", "News & Events")}
                      </a>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <a className="rounded-md px-3 py-2 text-sm hover:bg-accent" href="#">
                        {L("more_careers", "Careers")}
                      </a>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <a className="rounded-md px-3 py-2 text-sm hover:bg-accent" href="#">
                        {L("more_gallery", "Gallery")}
                      </a>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <MenuLink href="#">{L("contact", "Contact")}</MenuLink>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="secondary" className="hidden lg:inline-flex">
            {L("admissions_cta", "ONLINE ADMISSIONS 2026-27")}
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
                    { key: "home", fallback: "Home" },
                    { key: "about", fallback: "About" },
                    { key: "our_colleges", fallback: "Our Colleges" },
                    { key: "our_schools", fallback: "Our Schools" },
                    { key: "courses_offered", fallback: "Courses Offered" },
                    { key: "facilities", fallback: "Facilities" },
                    { key: "more", fallback: "More" },
                    { key: "contact", fallback: "Contact" },
                  ].map(({ key, fallback }) => (
                    <a key={key} className="rounded-md px-3 py-2 text-sm font-semibold hover:bg-accent" href="#">
                      {L(key, fallback)}
                    </a>
                  ))}
                  <div className="pt-2">
                    <Button variant="secondary" className="w-full">
                      {L("admissions_cta", "ONLINE ADMISSIONS 2026-27")}
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
