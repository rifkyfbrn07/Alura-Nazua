"use client";

import { useEffect, useRef, type RefObject } from "react";

type ModalEntry = {
  dialog: RefObject<HTMLElement | null>;
  close: () => void;
  previousFocus: HTMLElement | null;
};

// Keep scroll locking and keyboard handling shared so nested dialogs cannot
// unlock the page or all respond to the same Escape press.
const modalStack: ModalEntry[] = [];
let originalOverflow = "";
let rootPreviousFocus: HTMLElement | null = null;
let keyHandlerInstalled = false;

function getFocusable(dialog: HTMLElement) {
  return Array.from(dialog.querySelectorAll<HTMLElement>(
    'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
  )).filter((element) => element.offsetParent !== null);
}

function handleModalKeyDown(event: KeyboardEvent) {
  const top = modalStack.at(-1);
  const dialog = top?.dialog.current;
  if (!top || !dialog) return;

  if (event.key === "Escape") {
    event.preventDefault();
    top.close();
    return;
  }
  if (event.key !== "Tab") return;

  const focusable = getFocusable(dialog);
  if (focusable.length === 0) {
    event.preventDefault();
    dialog.focus();
    return;
  }
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

export function useModalLifecycle(
  isOpen: boolean,
  onClose: () => void,
  dialogRef: RefObject<HTMLElement | null>
) {
  const onCloseRef = useRef(onClose);
  useEffect(() => { onCloseRef.current = onClose; }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const previousFocus = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    const wasFirst = modalStack.length === 0;
    if (wasFirst) {
      originalOverflow = document.body.style.overflow;
      rootPreviousFocus = previousFocus;
      document.body.style.overflow = "hidden";
    }

    const entry: ModalEntry = {
      dialog: dialogRef,
      close: () => onCloseRef.current(),
      previousFocus,
    };
    modalStack.push(entry);
    if (!keyHandlerInstalled) {
      document.addEventListener("keydown", handleModalKeyDown);
      keyHandlerInstalled = true;
    }

    const focusInitial = window.requestAnimationFrame(() => {
      if (modalStack.at(-1) !== entry) return;
      const dialog = dialogRef.current;
      const firstFocusable = dialog && getFocusable(dialog)[0];
      (firstFocusable ?? dialog)?.focus();
    });

    return () => {
      window.cancelAnimationFrame(focusInitial);
      const index = modalStack.indexOf(entry);
      if (index < 0) return;
      const wasTop = index === modalStack.length - 1;
      modalStack.splice(index, 1);

      if (modalStack.length === 0) {
        document.removeEventListener("keydown", handleModalKeyDown);
        keyHandlerInstalled = false;
        document.body.style.overflow = originalOverflow;
        if (rootPreviousFocus?.isConnected) rootPreviousFocus.focus();
        rootPreviousFocus = null;
      }

      if (wasTop && modalStack.length > 0) {
        const nextDialog = modalStack.at(-1)?.dialog.current;
        if (nextDialog?.isConnected) nextDialog.focus();
      }
    };
  }, [isOpen, dialogRef]);
}
