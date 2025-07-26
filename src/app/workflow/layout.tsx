import Logo from "@/components/Logo"
import { ThemeModeToggle } from "@/components/ThemeModeToggle"
import { Separator } from "@/components/ui/separator"

function layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-col w-full h-screen">
      {children}
      <Separator />
      <footer className="w-full h-14 flex justify-between items-center px-4 md:px-6">
        <Logo iconsize={16} fontSize="text-xl" />
        <ThemeModeToggle />
      </footer>
    </div>
  )
}

export default layout
