import BreadcrumbHeader from "@/components/BreadcrumbHeader"
import { DesktopSidebars } from "@/components/Sidebars"
import { ThemeModeToggle } from "@/components/ThemeModeToggle"
import { Separator } from "@/components/ui/separator"
import { UserButton, SignedIn } from "@clerk/nextjs"

type Props = {
  children: React.ReactNode
}

const layout = ({ children }: Props) => {
  return (
    <div className="flex h-screen w-full">
      <DesktopSidebars />
      <div className="flex-1 flex-col flex">
        <header className="flex items-center justify-between px-2 py-4 h-[50px] container">
          <BreadcrumbHeader />
          <div className="flex items-center gap-4">
            <ThemeModeToggle />
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </header>
        <Separator />
        <div className="flex-1 w-full px-2 container py-4 text-accent-foreground">
          {children}
        </div>
      </div>
    </div>
  )
}

export default layout
