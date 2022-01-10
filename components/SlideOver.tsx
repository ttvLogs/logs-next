import { ReactNode } from "react";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { XIcon } from "@heroicons/react/outline";
import { Dialog, Transition } from "@headlessui/react";

type defProps = { children: ReactNode };

export function SlideOver ({ children }: defProps) {
  const [open, setOpen] = useState(true);
  const router = useRouter();
  return (
    <Transition.Root
      show={open}
      as={Fragment}
      appear={true}
      afterLeave={() => router.push("/")}
    >
      <Dialog
        as="div"
        static
        className="fixed inset-0 overflow-hidden z-50"
        open={open}
        onClose={setOpen}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-gray-500/75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="w-screen max-w-md">
                <div className="h-full flex flex-col py-6 bg-white dark:bg-darkGrey dark:bg-darkLight shadow-xl overflow-y-auto">
                  <div className="px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="text-lg font-medium">
                        Settings
                      </Dialog.Title>
                      <div className="ml-3 h-7 flex items-center">
                        <button
                          className="rounded-md text-gray-400 dark:text-gray-200 dark:hover:text-gray-400
                           hover:text-gray-500 focus:outline-dashed focus:outline-2 focus:outline-primary transition duration-200"
                          onClick={() => setOpen(false)}
                        >
                          <span className="sr-only">Close panel</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 relative flex-1 px-4 sm:px-6">
                    {children}
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};