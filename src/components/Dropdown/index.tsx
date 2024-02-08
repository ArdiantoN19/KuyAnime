"use client";

import React, { FunctionComponent, ReactNode, useState } from "react";

interface DropdownProps {
  label: ReactNode;
  children: ReactNode;
}

const Dropdown: FunctionComponent<DropdownProps> = ({ label, children }) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const showHideMenuHandler = () => {
    setIsShow((prev) => !prev);
  };
  return (
    <div className="min-w-10 relative">
      <div className="cursor-pointer block" onClick={showHideMenuHandler}>
        {label}
      </div>
      {isShow && (
        <div
          className={`absolute z-10 block transition-all right-3 top-12 rounded shadow bg-white py-3 w-auto`}
          onClick={showHideMenuHandler}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
