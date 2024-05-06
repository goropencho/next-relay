import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import logo from "@/assets/logo.png";

export default function Navbar() {
  return (
    <header className="shadow-md">
      <nav className="max-w-5xl m-auto px-3 py-5 flex justify-between items-center">
        <Link href="#" className="flex items-center gap-3">
          <Image src={logo} alt="logo" width={60} height={60} />
          <span className="text-xl font-bold tracking-light">Relay</span>
        </Link>
        <Button asChild>
          <Link href="/create-token">Create AccessToken</Link>
        </Button>
      </nav>
    </header>
  );
}
