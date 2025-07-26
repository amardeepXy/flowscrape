import Logo from "@/components/Logo"

function layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="w-full h-screen bg-background flex justify-center items-center flex-col gap-4">
      <div>
        <Logo />
      </div>
      {children}
    </div>
  )
}

export default layout
