import { classNames } from "../utils";
import { useRouter } from "next/router";
import { Disclosure } from "@headlessui/react";
import { ThemeSwitcher } from "./index";
import ppSpin from "../assets/images/ppSpin.gif";
import Link from "next/link";
import Image from "next/image";
import {
  MenuIcon,
  XIcon,
  ViewGridIcon,
  CogIcon,
} from "@heroicons/react/outline";
import { GithubIcon } from "../assets/icons";

export function Navigation() {
  const location = useRouter();
  const getPath = (name: string) => {
    return location.pathname === name ? true : false;
  };
  return (
    <header className="sticky top-0">
      <Disclosure
        as="div"
        className="dark:bg-black bg-white shadow"
      >
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 sticky top-0">
              <div className="relative flex justify-between h-16">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button
                    className="inline-flex items-center justify-center 
                  p-2 rounded-md text-gray-400 dark:text-gray-300 
                  hover:text-gray-500 dark:hover:text-gray-600 
                  hover:bg-gray-100 focus:outline-none dark:hover:bg-gray-200
                  focus:ring-2 focus:ring-inset focus:ring-primary transition duration-200"
                  >
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                  <Link href="/" passHref>
                    <div
                      className="flex-shrink-0 flex items-center space-x-2 dark:text-white 
                  text-gray-900 hover:text-primary dark:hover:text-primary transition duration-300 cursor-pointer"
                    >
                      <div className="mb-4">
                        <Image src={ppSpin} alt="ppSpin" layout={"fixed"} />
                      </div>
                      <span className="text-2xl font-semibold">twitchlogs</span>
                    </div>
                  </Link>
                  <div className="hidden sm:ml-14 sm:flex sm:space-x-8">
                    <Link href="/" passHref>
                      <div
                        className={classNames(
                          getPath("/" || "")
                            ? "border-primary text-gray-900 dark:text-white dark:hover:text-gray-300"
                            : "border-transparent text-gray-500 dark:text-gray-300 dark:hover:text-gray-200 hover:border-gray-300 hover:text-gray-700",
                          "transition duration-200 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium space-x-2 group cursor-pointer",
                        )}
                      >
                        <ViewGridIcon className="w-6 h-6 opacity-50 transform group-hover:rotate-180 transition duration-300" />
                        <span>Dashboard</span>
                      </div>
                    </Link>
                    <Link href="/settings" passHref>
                      <div
                        className={classNames(
                          getPath("/settings")
                            ? "border-primary text-gray-900 dark:text-white dark:hover:text-gray-300"
                            : "border-transparent text-gray-500 dark:text-gray-300 dark:hover:text-gray-200 hover:border-gray-300 hover:text-gray-700",
                          "transition duration-200 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium space-x-2 group cursor-pointer",
                        )}
                      >
                        <CogIcon className="w-6 h-6 opacity-50 transform group-hover:rotate-180 transition duration-300" />
                        <span>Settings</span>
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <ThemeSwitcher />
                  <a
                    href="https://github.com/etztrefis/twitchlogs"
                    target="_blank"
                    rel="noreferrer"
                    className="ml-6 md:ml-10 focus:outline-none focus:ring-2 focus:ring-primary rounded-full"
                  >
                    <GithubIcon className="w-8 h-8 dark:text-white dark:hover:text-primary hover:text-primary transition duration-300" />
                  </a>
                </div>
              </div>
            </div>
            <Disclosure.Panel className="sm:hidden">
              <div className="pt-2 pb-4 space-y-1">
                <Link href="/" passHref>
                  <div
                    className={classNames(
                      getPath("/" || "")
                        ? "dark:bg-gray-800 bg-indigo-50 border-primary text-primary"
                        : "border-transparent text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-400",
                      "transition duration-200 flex pl-3 pr-4 py-4 border-l-4 text-base font-medium space-x-2",
                    )}
                  >
                    <ViewGridIcon className="w-6 h-6 opacity-50" />
                    <span>Dashboard</span>
                  </div>
                </Link>
                <Link href="/settings" passHref>
                  <div
                    className={classNames(
                      getPath("/settings")
                        ? "dark:bg-gray-800 bg-indigo-50 border-primary text-primary"
                        : "border-transparent text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-400",
                      "transition duration-200 flex pl-3 pr-4 py-4 border-l-4 text-base font-medium space-x-2",
                    )}
                  >
                    <CogIcon className="w-6 h-6 opacity-50" />
                    <span>Settings</span>
                  </div>
                </Link>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </header>
  );
}
