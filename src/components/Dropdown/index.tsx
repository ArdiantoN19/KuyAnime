"use client";

import React, { FunctionComponent, ReactNode, useRef } from "react";

interface DropdownProps {
  label: ReactNode;
  children: ReactNode;
  target: string;
}

const Dropdown: FunctionComponent<DropdownProps> = ({
  label,
  children,
  target,
}) => {
  const menu = useRef<HTMLInputElement>(null);
  const hideMenuHandler = () => {
    if (menu.current?.checked) {
      menu.current.checked = false;
    }
  };
  return (
    <div className="min-w-10 relative">
      <input
        type="checkbox"
        name={target}
        id={target}
        className={`appearance-none absolute top-0 peer/${target}`}
        ref={menu}
      />
      <label htmlFor={target} className="cursor-pointer block">
        {label}
      </label>
      <div
        id={`dropdown-${target}`}
        className={`absolute z-10 hidden transition-all peer-checked/${target}:block right-3 top-12 rounded shadow bg-white py-3 w-auto`}
        onClick={hideMenuHandler}
      >
        {children}
      </div>
    </div>
  );
};

export default Dropdown;
