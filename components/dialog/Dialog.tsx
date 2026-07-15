"use client";

import {
  type ReactNode,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { X } from "lucide-react";

type DialogProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  ariaLabel: string;
  size?: "default" | "wide";
};

const ease = [0.22, 1, 0.36, 1] as const;

const focusableSelector = [
  'a[href]',
  'area[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'iframe',
  'object',
  'embed',
  '[contenteditable="true"]',
  '[tabindex]:not([tabindex="-1"])',
].join(",");

let openDialogCount = 0;
let lockedScrollY = 0;
const dialogStack: symbol[] = [];

function lockPageScroll() {
  openDialogCount += 1;

  if (openDialogCount > 1) return;

  lockedScrollY = window.scrollY;

  document.body.classList.add("modal-open");
  document.body.style.position = "fixed";
  document.body.style.top = `-${lockedScrollY}px`;
  document.body.style.right = "0";
  document.body.style.left = "0";
  document.body.style.width = "100%";
}

function unlockPageScroll() {
  openDialogCount = Math.max(0, openDialogCount - 1);

  if (openDialogCount > 0) return;

  document.body.classList.remove("modal-open");
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.right = "";
  document.body.style.left = "";
  document.body.style.width = "";

  const root = document.documentElement;
  const previousScrollBehavior = root.style.scrollBehavior;

  root.style.scrollBehavior = "auto";
  window.scrollTo(0, lockedScrollY);

  window.requestAnimationFrame(() => {
    root.style.scrollBehavior = previousScrollBehavior;
  });
}

function getFocusableElements(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll<HTMLElement>(focusableSelector),
  ).filter((element) => {
    const styles = window.getComputedStyle(element);

    return (
      styles.display !== "none" &&
      styles.visibility !== "hidden" &&
      !element.hasAttribute("inert")
    );
  });
}

export default function Dialog({
  isOpen,
  onClose,
  children,
  ariaLabel,
  size = "default",
}: DialogProps) {
  const [isMounted, setIsMounted] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const generatedId = useId();

  const panelId = `dialog-${generatedId.replace(/:/g, "")}`;
  const dialogTokenRef = useRef(Symbol("dialog"));
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen || !isMounted) return;

    const token = dialogTokenRef.current;
    dialogStack.push(token);

    previouslyFocusedRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    lockPageScroll();

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, shouldReduceMotion ? 0 : 90);

    return () => {
      window.clearTimeout(focusTimer);

      const tokenIndex = dialogStack.lastIndexOf(token);

      if (tokenIndex >= 0) {
        dialogStack.splice(tokenIndex, 1);
      }

      unlockPageScroll();

      const previousElement = previouslyFocusedRef.current;

      window.requestAnimationFrame(() => {
        if (previousElement?.isConnected) {
          previousElement.focus({ preventScroll: true });
        }
      });
    };
  }, [isMounted, isOpen, shouldReduceMotion]);

  useEffect(() => {
    if (!isOpen || !isMounted) return;

    const token = dialogTokenRef.current;

    const handleKeyDown = (event: KeyboardEvent) => {
      const isTopDialog =
        dialogStack[dialogStack.length - 1] === token;

      if (!isTopDialog) return;

      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) {
        return;
      }

      const focusableElements = getFocusableElements(
        panelRef.current,
      );

      if (focusableElements.length === 0) {
        event.preventDefault();
        panelRef.current.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement =
        focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;

      if (
        event.shiftKey &&
        (activeElement === firstElement ||
          !panelRef.current.contains(activeElement))
      ) {
        event.preventDefault();
        lastElement.focus();
        return;
      }

      if (
        !event.shiftKey &&
        (activeElement === lastElement ||
          !panelRef.current.contains(activeElement))
      ) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown, true);

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown,
        true,
      );
    };
  }, [isMounted, isOpen, onClose]);

  if (!isMounted) return null;

  const backdropTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.22, ease };

  const panelTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.42, ease };

  const dialog = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="apple-dialog"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={backdropTransition}
          onPointerDown={(event) => {
            if (event.target === event.currentTarget) {
              onClose();
            }
          }}
        >
          <motion.div
            ref={panelRef}
            id={panelId}
            className={`apple-dialog__panel apple-dialog__panel--${size}`}
            role="dialog"
            aria-modal="true"
            aria-label={ariaLabel}
            tabIndex={-1}
            initial={
              shouldReduceMotion
                ? { opacity: 1 }
                : {
                    opacity: 0,
                    y: 28,
                    scale: 0.985,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : {
                    opacity: 0,
                    y: 18,
                    scale: 0.99,
                  }
            }
            transition={panelTransition}
            onPointerDown={(event) => {
              event.stopPropagation();
            }}
          >
            <div
              className="apple-dialog__mobile-handle"
              aria-hidden="true"
            />

            <button
              ref={closeButtonRef}
              type="button"
              className="apple-dialog__close"
              onClick={onClose}
              aria-label="Pencereyi kapat"
            >
              <X
                size={18}
                strokeWidth={1.9}
                aria-hidden="true"
              />
            </button>

            <div className="apple-dialog__content">
              {children}
            </div>
          </motion.div>

          <style jsx global>{`
            .apple-dialog {
              position: fixed;
              inset: 0;
              z-index: 300;
              display: grid;
              place-items: center;
              padding: clamp(0.8rem, 2.6vw, 2rem);
              background: rgba(22, 22, 26, 0.42);
              overscroll-behavior: contain;
            }

            @supports (backdrop-filter: blur(8px)) {
              .apple-dialog {
                backdrop-filter: blur(8px) saturate(0.92);
              }
            }

            .apple-dialog__panel {
              position: relative;
              width: min(100%, 900px);
              max-height: calc(100dvh - clamp(1.6rem, 5.2vw, 4rem));
              overflow: hidden;
              border: 1px solid rgba(255, 255, 255, 0.92);
              border-radius: 36px;
              background: var(--page);
              box-shadow:
                0 8px 22px rgba(17, 17, 20, 0.08),
                0 42px 120px rgba(17, 17, 20, 0.24);
              color: var(--ink);
              outline: none;
            }

            .apple-dialog__panel--wide {
              width: min(100%, 1240px);
            }

            .apple-dialog__content {
              max-height: inherit;
              overflow-x: hidden;
              overflow-y: auto;
              overscroll-behavior: contain;
              scrollbar-gutter: stable;
            }

            .apple-dialog__close {
              position: absolute;
              top: 1rem;
              right: 1rem;
              z-index: 20;
              width: 42px;
              height: 42px;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              border: 1px solid rgba(17, 17, 20, 0.08);
              border-radius: 50%;
              background: rgba(255, 255, 255, 0.92);
              color: var(--ink);
              box-shadow: var(--shadow-sm);
              transition:
                transform 0.22s var(--ease),
                background-color 0.22s var(--ease),
                border-color 0.22s var(--ease);
            }

            .apple-dialog__close:hover {
              transform: rotate(4deg) scale(1.04);
              border-color: rgba(17, 17, 20, 0.14);
              background: #ffffff;
            }

            .apple-dialog__mobile-handle {
              display: none;
            }

            @media (max-width: 767px) {
              .apple-dialog {
                display: block;
                padding: 0;
                background: var(--page);
                backdrop-filter: none !important;
              }

              .apple-dialog__panel,
              .apple-dialog__panel--default,
              .apple-dialog__panel--wide {
                width: 100%;
                height: 100dvh;
                max-height: 100dvh;
                border: 0;
                border-radius: 0;
                box-shadow: none;
              }

              .apple-dialog__close {
                top: 0.78rem;
                right: 0.8rem;
                width: 40px;
                height: 40px;
                box-shadow: var(--shadow-xs);
              }

              .apple-dialog__mobile-handle {
                position: absolute;
                top: 0.58rem;
                left: 50%;
                z-index: 20;
                width: 38px;
                height: 4px;
                display: block;
                border-radius: 999px;
                background: rgba(17, 17, 20, 0.14);
                transform: translateX(-50%);
                pointer-events: none;
              }
            }

            @media (prefers-reduced-motion: reduce) {
              .apple-dialog__close {
                transition: none;
              }

              .apple-dialog__close:hover {
                transform: none;
              }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(dialog, document.body);
}
