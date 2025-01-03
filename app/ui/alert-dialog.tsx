"use client";

import React, { useRef, useEffect, useState, ReactNode } from "react";

type AlertDialogProps = {
  isOpen: boolean;
  hasCloseButton?: boolean;
  onClose?: () => void;
  children: ReactNode;
  closeButton: ReactNode;
  closeWithEscape?: boolean;
  buttons?: ReactNode[];
  onCloseWithButton?: (index: number) => void;
  className?: string;
};

export function AlertDialog({
  isOpen,
  hasCloseButton = true,
  onClose,
  children,
  closeButton = <div className="bg-blue-500 text-white">Close</div>,
  className = "bg-zinc-700 text-white",
  closeWithEscape = false,
  buttons,
  onCloseWithButton,
}: AlertDialogProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(isOpen);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  function handleCloseDialog() {
    if (onClose) {
      onClose();
    }
    setIsDialogOpen(false);
  }

  function handleCloseDialogByButton(index: number) {
    if (onCloseWithButton) {
      onCloseWithButton(index);
    }
    setIsDialogOpen(false);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDialogElement>) {
    if (closeWithEscape && event.key === "Escape") {
      handleCloseDialog();
    }
  }

  useEffect(() => {
    setIsDialogOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (dialog) {
      if (isDialogOpen) {
        dialog.showModal();
      } else {
        dialog.close();
      }
    }
  }, [isDialogOpen]);

  return (
    <dialog ref={dialogRef} onKeyDown={handleKeyDown} className={className}>
      {children}
      <footer className="flex flex-row">
        {buttons?.map((button, index) => (
          <button
            key={`${index}`}
            onClick={() => handleCloseDialogByButton(index)}>
            {button}
          </button>
        ))}
        {hasCloseButton && (
          <button onClick={handleCloseDialog}>{closeButton}</button>
        )}
      </footer>
    </dialog>
  );
}

export default AlertDialog;
