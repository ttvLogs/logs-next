import { FC, useEffect, useState } from "react";
import { classNames } from "../utils";
import {
  useCombobox,
  UseComboboxState,
  UseComboboxStateChangeOptions,
} from "downshift";
import { Transition } from "@headlessui/react";

const DownshiftComponent: FC<{
  className?: string;
  handleSelectedItemChange: (changes: any) => void;
  items: string[];
}> = ({ className = "", handleSelectedItemChange, items }) => {
  const [inputItems, setInputItems] = useState(items);
  const [input, setInput] = useState(null);

  useEffect(() => {
    if (input !== null) {
      handleSelectedItemChange(input);
    }
  }, [input, handleSelectedItemChange]);

  function stateReducer(
    state: UseComboboxState<string>,
    actionAndChanges: UseComboboxStateChangeOptions<string>,
  ) {
    const { type, changes } = actionAndChanges;
    if (
      type === useCombobox.stateChangeTypes.ItemClick ||
      type === useCombobox.stateChangeTypes.InputBlur
    ) {
      setInput(changes.inputValue);
    }
    switch (type) {
      case useCombobox.stateChangeTypes.InputChange:
        return {
          ...changes,
          inputValue: changes.inputValue,
        };
      case useCombobox.stateChangeTypes.ItemClick:
      case useCombobox.stateChangeTypes.InputKeyDownEnter:
      case useCombobox.stateChangeTypes.InputBlur:
        return {
          ...changes,
          ...(changes.selectedItem && {
            inputValue: changes.inputValue,
          }),
        };
      default:
        return changes;
    }
  }

  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items: inputItems,
    stateReducer,
    onInputValueChange: ({ inputValue }) => {
      setInputItems(
        items.filter((item) =>
          item.toLowerCase().startsWith(inputValue.toLowerCase()),
        ),
      );
    },
  });
  return (
    <div className={className}>
      <div className="w-full">
        <label
          htmlFor="channelSelect"
          id="chooseChannel"
          className="block text-sm font-medium text-gray-700 dark:text-gray-100 uppercase"
        >
          Choose a channel:
        </label>
        <div {...getComboboxProps()} className="mt-1 relative">
          <input
            {...getInputProps({
              placeholder: "forsen",
              id: "channelSelect",
            })}
            className="relative w-full bg-white dark:bg-[#333333] border border-gray-300 rounded-md
          shadow-sm pl-3 pr-10 py-2 text-left focus:outline-none focus:ring-1 dark:placeholder-gray-300
          focus:ring-primary focus:border-primary sm:text-sm transition duration-200 dark:border-gray-500"
          />
        </div>
        <Transition
          show={isOpen}
          as="div"
          enter="transition ease-in duration-100"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <ul
            className="absolute z-10 w-full mt-1 bg-white shadow-lg
         max-h-56 rounded-md text-base ring-1 ring-black dark:ring-gray-100/10 ring-opacity-5 
         overflow-auto focus:outline-none sm:text-sm dark:bg-darkGrey"
            {...getMenuProps({}, { suppressRefError: true })}
          >
            {isOpen &&
              inputItems.map((item, index) => (
                <li
                  className={classNames(
                    highlightedIndex === index
                      ? "text-white bg-primary dark:bg-primaryLight/50"
                      : "text-gray-900 dark:text-gray-100",
                    `cursor-default select-none relative py-2 pl-3 pr-9 border-b
                   dark:border-gray-100/10`,
                  )}
                  key={`${item}${index}`}
                  {...getItemProps({ item, index })}
                >
                  {item}
                </li>
              ))}
          </ul>
        </Transition>
      </div>
    </div>
  );
};

export default DownshiftComponent;
