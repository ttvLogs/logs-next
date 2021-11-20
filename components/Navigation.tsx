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
    <header className="sticky top-0 z-30 border-b dark:border-gray-500">
      <Disclosure as="div" className="dark:bg-darkGrey bg-white shadow" id="navigation">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 sticky top-0 pt-0.5">
              <div className="relative flex justify-between h-16">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button
                    className="inline-flex items-center justify-center 
                  p-2 rounded-md text-gray-400 dark:text-gray-300 dark:hover:text-gray-200
                  hover:text-gray-500 focus:outline-primary transition 
                  hover:bg-gray-100 dark:hover:bg-darkBlack duration-200"
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
                    <button className="flex-shrink-0 flex items-center space-x-2 dark:text-white text-gray-900 cursor-pointer focus-visible:outline-primary">
                      <div className="mb-5 hidden sm:block">
                        <Image src={ppSpin} alt="ppSpin" />
                      </div>
                      <span className="text-4xl sm:text-2xl font-semibold mb-1">
                        ttvLogs
                      </span>
                    </button>
                  </Link>
                  <div className="hidden sm:ml-14 sm:flex sm:space-x-8">
                    <Link href="/" passHref>
                      <button
                        className={classNames(
                          getPath("/" || "")
                            ? "border-primary text-gray-900 dark:text-white dark:hover:text-gray-300"
                            : "border-transparent text-gray-500 dark:text-gray-300 dark:hover:text-gray-200 hover:border-gray-300 hover:text-gray-700",
                          "transition duration-200 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium space-x-2 group cursor-pointer focus-visible:outline-primary",
                        )}
                      >
                        <ViewGridIcon className="w-6 h-6 opacity-50 transform group-hover:rotate-180 transition duration-300" />
                        <span>Dashboard</span>
                      </button>
                    </Link>
                    {/* <Link href="/settings" passHref>
                      <button
                        className={classNames(
                          getPath("/settings")
                            ? "border-primary text-gray-900 dark:text-white dark:hover:text-gray-300"
                            : "border-transparent text-gray-500 dark:text-gray-300 dark:hover:text-gray-200 hover:border-gray-300 hover:text-gray-700",
                          "transition duration-200 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium space-x-2 group cursor-pointer focus-visible:outline-primary",
                        )}
                      >
                        <CogIcon className="w-6 h-6 opacity-50 transform group-hover:rotate-180 transition duration-300" />
                        <span>Settings</span>
                      </button>
                    </Link> */}
                  </div>
                </div>
                <div className="items-center justify-center hidden sm:flex">
                  <ThemeSwitcher />
                  <a
                    href="https://github.com/ttvLogs"
                    target="_blank"
                    rel="noreferrer"
                    className="ml-6 md:ml-10 focus:outline-primary"
                  >
                    <GithubIcon className="w-8 h-8 dark:text-white dark:hover:text-primary hover:text-primary transition duration-300" />
                  </a>
                </div>
              </div>
            </div>
            <Disclosure.Panel className="sm:hidden absolute w-full bd:white dark:bg-darkGrey border-b border-gray-300 dark:border-black">
              <div className="pt-2 pb-4 space-y-1">
                <div className="border-t dark:border-darkBlack">
                  <Link href="/" passHref>
                    <div
                      className={classNames(
                        getPath("/" || "")
                          ? "dark:bg-[#202124] bg-indigo-50 border-primary text-primary"
                          : "border-transparent text-gray-500 hover:bg-gray-50 dark:hover:bg-[#292A2D] hover:border-gray-300 dark:hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-400",
                        "transition duration-200 flex pl-3 pr-4 py-4 border-l-4 text-base font-medium space-x-2",
                      )}
                    >
                      <ViewGridIcon className="w-6 h-6 opacity-50" />
                      <span>Dashboard</span>
                    </div>
                  </Link>
                  {/* <Link href="/settings" passHref>
                    <div
                      className={classNames(
                        getPath("/settings")
                          ? "dark:bg-[#202124] bg-indigo-50 border-primary text-primary"
                          : "border-transparent text-gray-500 hover:bg-gray-100 dark:hover:bg-[#292A2D] hover:border-gray-300 dark:hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-400",
                        "transition duration-200 flex pl-3 pr-4 py-4 border-l-4 text-base font-medium space-x-2",
                      )}
                    >
                      <CogIcon className="w-6 h-6 opacity-50" />
                      <span>Settings</span>
                    </div>
                  </Link> */}
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </header>
  );
}
