import { cn } from "@/lib/utils"
import { SquareDashedMousePointer } from "lucide-react"
import Link from "next/link"

type Props = {
  fontSize?: string,
  iconsize?: number
}

const Logo = ({ fontSize = "text-2xl", iconsize = 17 }: Props) => {
  return (
    <Link
      href="/"
      className={cn("text-2xl font-extrabold flex items-center gap-2", fontSize)}
    >
      <div className="rounded-lg bg-gradient-to-r from-sky-500 to-sky-600 p-2">
        <SquareDashedMousePointer size={iconsize}
          className="stroke-white" />
      </div>
      <div>
        <span className="bg-gradient-to-r from-sky-500 to-sky-600 text-transparent bg-clip-text">Flow</span>
        <span>
          Scrape
        </span>
      </div>
    </Link>
  )
}

export default Logo
