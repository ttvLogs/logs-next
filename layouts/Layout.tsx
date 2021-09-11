import { ReactNode } from "react";
import { Navigation } from "../components";

type defProps = { children: ReactNode };

export default function Layout({ children }: defProps) {
  return (
    <>
      <header>
        <Navigation />
      </header>
      <main>
        {children}
      </main>
    </>
  );
}
