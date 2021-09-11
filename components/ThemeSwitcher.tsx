import { useState, useEffect } from "react";
import { classNames } from "../utils";
import { Switch } from "@headlessui/react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@heroicons/react/outline";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const [checked, setChecked] = useState(false);
  const [mounted, setMounted] = useState(false);

  const handleChange = (nextChecked: boolean) => {
    setChecked(nextChecked);
  };

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    setTheme(checked ? "light" : "dark");
  }, [checked, setTheme]);

  if (!mounted) return null;

  return (
    <Switch
      checked={checked}
      onChange={handleChange}
      className={classNames(
        checked
          ? "bg-gray-200 focus:ring-yellow-500"
          : "bg-gray-200 focus:ring-gray-200",
        "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer hover:bg-gray-300 transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ",
      )}
    >
      <span className="sr-only">Use setting</span>
      <span
        className={classNames(
          checked ? "translate-x-5" : "translate-x-0",
          "pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200",
        )}
      >
        <span
          className={classNames(
            checked
              ? "opacity-0 ease-out duration-100"
              : "opacity-100 ease-in duration-200",
            "absolute inset-0 h-full w-full flex items-center justify-center transition-opacity",
          )}
          aria-hidden="true"
        >
          <MoonIcon className="h-4 w-4 text-gray-500" />
        </span>
        <span
          className={classNames(
            checked
              ? "opacity-100 ease-in duration-200"
              : "opacity-0 ease-out duration-100",
            "absolute inset-0 h-full w-full flex items-center justify-center transition-opacity",
          )}
          aria-hidden="true"
        >
          <SunIcon className="h-4 w-4 text-yellow-500" />
        </span>
      </span>
    </Switch>
  );
}
