import { ReactNode } from "react";
import { Navigation } from "../components";

type defProps = { children: ReactNode };

export default function Layout({ children }: defProps) {
  return (
    <>
      <header className="sticky top-0 z-50">
        <Navigation />
      </header>
      <main>
        {children}
      </main>
    </>
  );
}
