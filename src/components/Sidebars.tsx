"use client"

import { Coins, Home, Layers2Icon, MenuIcon, ShieldCheckIcon } from "lucide-react";
import Logo from "./Logo";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { usePathname } from "next/navigation";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { useState } from "react";

const routes = [
  {
    href: ".",
    label: "Home",
    icon: Home
  }, {
    href: "workflows",
    label: "Workflows",
    icon: Layers2Icon
  },
  {
    href: "credentials",
    label: "Credentials",
    icon: ShieldCheckIcon
  },
  {
    href: "billing",
    label: "Billing",
    icon: Coins
  }
]

const DesktopSidebars = () => {

  const pathname = usePathname();
  const activeRoute = routes.find(routes => pathname.includes(routes.href) ? true : false) || routes[0];


  return (
    <div className="hidden relative max-w-[260px] md:block min-w-[260px] h-screen overflow-hidden w-full bg-primary/15 dark:bg-secondary/30 dark:text-foreground text-muted-foreground border-r-2 border-separate">
      <div className=" flex justify-around items-center border-separate border-b p-3">
        <Logo />
      </div>
      <div className="p-2">TODO CREDITS</div>
      <div className="flex flex-col p-2 gap-0.5">
        {routes.map(route => <Link
          href={route.href}
          key={route.href}
          className={buttonVariants({ variant: activeRoute.href === route.href ? "sidebarActiveItem" : "sidebarItem" })}>
          <route.icon size={20} />
          <span>{route.label}</span>
        </Link>)}
      </div>
    </div>
  )
}

function MobileSidebar() {
  const pathname = usePathname();
  const activeRoute = routes.find(route => pathname.includes(route.href) ? true : false) || routes[0];

  const [open, setOpen] = useState(false)

  return (
    <div className="block md:hidden bg-background">
      <nav>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="flex items-center justify-center">
            <Button variant={"ghost"} size={"sm"}>
              <MenuIcon size={20} />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[350px] sm:w-[540px] space-y-2" side="left">
            <SheetHeader>
              <SheetTitle className="flex justify-center items-center">
                <Logo iconsize={15} />
              </SheetTitle>
            </SheetHeader>

            {/* Rendering routes */}
            <div className="flex flex-col gap-y-2 w-full px-2">
              {routes.map(route => <SheetClose key={route.href} asChild>
                <Link
                  href={route.href}
                  key={route.href}
                  className={buttonVariants({ variant: activeRoute.href === route.href ? "sidebarActiveItem" : "sidebarItem" })}>
                  <route.icon size={20} />
                  <span>{route.label}</span>
                </Link>
              </SheetClose>)}
            </div>
          </SheetContent>
        </Sheet>
      </nav>

    </div>
  )
}


export { DesktopSidebars, MobileSidebar };
