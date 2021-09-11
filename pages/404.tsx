import Link from "next/link";
import Image from "next/image";
import MainLayout from "../layouts/Layout";
import ppSpin from "../assets/images/ppHop.gif";
import type { ReactElement } from "react";

export default function Custom404() {
  return (
    <div className="pt-16 pb-12 flex flex-col">
      <main className="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex-shrink-0 inline-flex justify-center">
          <Image className="h-12 w-auto" src={ppSpin} alt="" />
        </div>
        <div className="py-8">
          <div className="text-center">
            <p className="text-sm font-semibold text-primary uppercase tracking-wide">
              404 error
            </p>
            <h1 className="mt-2 text-4xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight sm:text-5xl">
              Page not found.
            </h1>
            <p className="mt-2 text-base text-gray-500 dark:text-gray-200">
              Yes, this is a 404 error. How could you tell?
            </p>
            <div className="mt-6">
              <a
                href="#"
                className="text-base font-medium text-primary hover:text-primaryLight transition duration-200"
              >
                Go back home
              </a>
            </div>
          </div>
        </div>
      </main>
      <footer className="flex-shrink-0 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-center space-x-4">
          <Link href="#" passHref>
            <span className="text-sm font-medium text-gray-500 hover:text-gray-600">
              Issues
            </span>
          </Link>
        </nav>
      </footer>
    </div>
  );
}

Custom404.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;
