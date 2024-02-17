import Link from "next/link";

export default async function Nav() {
  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-16 mx-auto border-b duration-200 bg-red-500 border-ui-border-base">
        <nav className="grid grid-cols-2 items-center justify-center text-center h-16">
          <Link href="/">Todos A</Link>
          <Link href="/todos">Todos B</Link>
        </nav>
      </header>
    </div>
  );
}
