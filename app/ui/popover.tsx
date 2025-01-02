"use client";

import React, { useState, useRef, ReactNode } from "react";
import { useOutsideClick } from "@/app/lib/use-outside-click";

type Props = {
  children: ReactNode;
  content: ReactNode;
};

export default function Popover({ children, content }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const popoverRef = useRef(null);
  const triggerRef = useRef(null);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const ref = useOutsideClick(() => {
    setIsVisible(false);
  });

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        type="button"
        ref={triggerRef}
        onClick={toggleVisibility}
        className="bg-blue-500 text-white p-2 cursor-pointer rounded-md"
        aria-haspopup="true"
        aria-expanded={isVisible}
        aria-controls="popover-content">
        {children}
      </button>
      {isVisible && (
        <div
          id="popover-content"
          ref={popoverRef}
          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white border-[1px] border-solid border-gray-400 shadow-lg rounded-md p-4 z-10 whitespace-nowrap"
          role="dialog"
          aria-modal="true">
          {content}
        </div>
      )}
    </div>
  );
}
