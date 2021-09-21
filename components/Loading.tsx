import Image from "next/image";
import { Transition } from "@headlessui/react";
import ppHopper from "../assets/images/ppHopper.gif";

export function Loading() {
  return (
    // global region
    <div
      aria-live="assertive"
      className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start z-20 backdrop-blur-[2px]"
    >
      <div className="w-full flex flex-col sm:self-center items-center space-y-4 ">
        <Transition
          show={true}
          enter="transition ease-in duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-300"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-300"
          leaveTo="opacity-0"
        >
          <div className="text-center">
            <Image className="h-12 w-auto" src={ppHopper} alt="" />
            <p className="text-lg">Loading data ...</p>
          </div>
        </Transition>
      </div>
    </div>
  );
}
