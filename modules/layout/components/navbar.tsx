import Link from "next/link";

export default async function Nav() {
  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-16 mx-auto border-b duration-200 bg-red-500 border-ui-border-base">
        <nav className="content-container flex items-center justify-between w-full h-full">
          <div className="flex-1 basis-0 h-full flex items-center">
            <div className="h-full flex space-x-4">
              <Link href="/">T0D0S</Link>
              <Link href="/">Todos A</Link>
              <Link href="/todos">Todos B</Link>
              <Link href="/todoslee">Todos Lee Implementation</Link>
            </div>
          </div>

          <div className="flex items-center h-full"></div>

          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <div className="hidden small:flex items-center gap-x-6 h-full"></div>
          </div>
        </nav>
      </header>
    </div>
  );
}
