import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

function notfound() {
  return (
    <div className="w-full flex items-center flex-col justify-center h-screen">
      <Image src={"/404-error.svg"} alt="404 error" width={200} height={200} />
      <h1 className="font-bold text-2xl">Requested page doesn't exist</h1>
      <Link href={"/"} className="flex my-4 bg-primary px-3 py-1 rounded-md gap-2 items-center hover:bg-primary/80"><ArrowLeft size={18} /> Back to Dashboard</Link>
      <p className="text-accent">If you believe this is an error, please report us</p>
    </div>
  )
}

export default notfound
