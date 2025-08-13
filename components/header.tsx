import Link from "next/link"
import { Leaf } from "lucide-react"

export function Header() {
  return (
    <header className="w-full flex justify-center mt-6">
      <nav className="flex items-center gap-8 px-8 py-3 rounded-2xl bg-white/80 shadow-lg backdrop-blur border border-green-100 max-w-3xl w-full mx-auto">
        <Link href="/" className="flex items-center gap-2 font-extrabold text-green-700 text-xl">
          <Leaf className="h-7 w-7 text-green-600" />
          Tarasvie
        </Link>
        <div className="flex-1 flex justify-center gap-6">
          <Link href="/products" className="text-green-700 font-medium hover:text-green-900 transition">Products</Link>
          <Link href="/about" className="text-green-700 font-medium hover:text-green-900 transition">About</Link>
          <Link href="/contact" className="text-green-700 font-medium hover:text-green-900 transition">Contact</Link>
        </div>
        <Link href="/auth/login" className="ml-auto">
          <span className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-green-700 transition">Sign In</span>
        </Link>
      </nav>
    </header>
  )
}