import { ReactNode } from "react";

type FilledButtonProps = {
  children: ReactNode | string;
  buttonClass?: string;
  callback?: () => void;
};

export const FilledButton = ({
  children,
  buttonClass,
  callback,
}: FilledButtonProps) => {
  return (
    <button
      onClick={callback}
      className={`bg-main-color hover:bg-red-600 transition-all rounded-full h-fit w-fit font-bold px-4 py-2 text-white text-[10px] sm:text-lg shadow-lg shadow-red-700 ${buttonClass}`}
    >
      {children}
    </button>
  );
};

type OutlineButtonProps = {
  children: ReactNode | string;
  buttonClass?: string | null;
  callback?: () => void | null;
};

export const OutlineButton = ({
  children,
  buttonClass,
  callback,
}: OutlineButtonProps) => {
  return (
    <button
      onClick={callback}
      className={`hover:border-main-color hover:text-main-color transition-all border-2 rounded-full h-fit w-fit font-bold px-4 py-2 text-white text-[10px]  sm:text-lg  border-white ${buttonClass}`}
    >
      {children}
    </button>
  );
};
