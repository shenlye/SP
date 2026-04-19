import Link from "next/link";
import { ThemeToggle } from "./components/theme-toggle";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Posts", href: "/posts" },
  { label: "Friends", href: "/friends" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-5 sm:px-8">
          <Link href="/" className="text-lg font-semibold text-foreground">
            SavePoint
          </Link>

          <div className="flex items-center gap-4 sm:gap-6">
            <nav aria-label="Primary" className="flex items-center gap-6 sm:gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-md font-medium tracking-wide text-muted transition-colors duration-200 hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <ThemeToggle />
          </div>
        </div>
      </header>
    </div>
  );
}
