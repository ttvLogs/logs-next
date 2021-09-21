import { Fragment, useState, FC, useEffect } from "react";
import { Transition } from "@headlessui/react";
import {
  CheckCircleIcon,
  XIcon,
  XCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/outline";

type AlertProps = {
  type?: "ok" | "error" | "warning";
  title: string;
  text?: string;
};

export const Alert: FC<AlertProps> = ({ type = "ok", title, text }) => {
  const [show, setShow] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 10000);
  }, []);
  return (
    <>
      <div
        aria-live="assertive"
        className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start z-50"
      >
        <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
          <Transition
            show={show}
            as={Fragment}
            enter="transform transition ease-in-out duration-500 sm:duration-700"
            enterFrom="translate-x-full opacity-0"
            enterTo="translate-x-0 opacity-300"
            leave="transform transition ease-in-out duration-500 sm:duration-700"
            leaveFrom="translate-x-0 opacity-300"
            leaveTo="translate-x-full opacity-0"
          >
            <div className="max-w-sm w-full bg-white dark:bg-darkGrey shadow-lg rounded-lg pointer-events-auto ring-1 ring-black dark:ring-primary ring-opacity-5 overflow-hidden">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    {type === "ok" && (
                      <CheckCircleIcon
                        className="h-6 w-6 text-green-400"
                        aria-hidden="true"
                      />
                    )}
                    {type === "error" && (
                      <XCircleIcon
                        className="h-6 w-6 text-red-400"
                        aria-hidden="true"
                      />
                    )}
                    {type === "warning" && (
                      <ExclamationCircleIcon
                        className="h-6 w-6 text-yellow-400"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-50">
                      {title}
                    </p>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                      {type !== "error" ? (
                        text
                      ) : (
                        <span>
                          <a
                            href="https://github.com/ttvLogs/logs-next/issues"
                            target="_blank"
                            rel="noreferrer"
                            className="text-primary hover:text-purple-400 transition duration-200"
                          >
                            Let me know
                          </a>{" "}
                          me so I can fix the problem.
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="ml-4 flex-shrink-0 flex">
                    <button
                      className="bg-transparent rounded-md inline-flex text-gray-400 dark:hover:text-gray-200 hover:text-gray-500 focus:outline-primary"
                      onClick={() => {
                        setShow(false);
                      }}
                    >
                      <span className="sr-only">Close</span>
                      <XIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  );
};
