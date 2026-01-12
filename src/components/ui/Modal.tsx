// Modal component - accessible modal with focus trap, keyboard handling, and backdrop click
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { ButtonLink } from "./Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  year?: string;
  children: React.ReactNode;
  externalLink?: {
    url: string;
    label: string;
  };
}

export function Modal({
  isOpen,
  onClose,
  title,
  year,
  children,
  externalLink,
}: ModalProps) {
  const { t } = useTranslation();
  const modalRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);

  // Focus trap and keyboard handling
  useEffect(() => {
    if (!isOpen) return;

    // Get all focusable elements within modal
    const getFocusableElements = () => {
      if (!modalRef.current) return [];
      return Array.from(
        modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      ) as HTMLElement[];
    };

    // Handle Escape key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      // Focus trap
      if (e.key === "Tab") {
        const focusableElements = getFocusableElements();
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        const activeElement = document.activeElement;

        if (e.shiftKey) {
          // Shift + Tab
          if (activeElement === firstElement) {
            e.preventDefault();
            (lastElement as HTMLElement).focus();
          }
        } else {
          // Tab
          if (activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    // Prevent body scroll
    const originalOverflow = document.body.style.overflow;
    const root = document.documentElement;
    document.body.style.overflow = "hidden";
    root.classList.add("modal-open");
    const lenisControl = window as unknown as {
      __lenis_stop?: () => void;
      __lenis_start?: () => void;
    };
    lenisControl.__lenis_stop?.();

    const modalElement = modalRef.current;
    const handleScrollBlock = (event: Event) => {
      event.stopPropagation();
    };
    modalElement?.addEventListener("wheel", handleScrollBlock);
    modalElement?.addEventListener("touchmove", handleScrollBlock, {
      passive: true,
    });

    // Set initial focus
    if (firstFocusableRef.current) {
      firstFocusableRef.current.focus();
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
      root.classList.remove("modal-open");
      lenisControl.__lenis_start?.();
      modalElement?.removeEventListener("wheel", handleScrollBlock);
      modalElement?.removeEventListener("touchmove", handleScrollBlock);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="modal-backdrop"
      onClick={handleBackdropClick}
      role="presentation"
      aria-hidden={!isOpen}
    >
      <div
        className="modal-content"
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="modal-header">
          <div className="modal-hero">
            <div className="modal-hero-title">
              {title}
              {year && <span className="modal-hero-year">{year}</span>}
            </div>
          </div>
          <button
            ref={firstFocusableRef}
            className="modal-close"
            onClick={onClose}
            aria-label={t("modal.close")}
          >
            <svg
              className="modal-close-icon"
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M6 6l12 12M18 6L6 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="square"
              />
            </svg>
          </button>
        </div>

        <div className="modal-body">{children}</div>

        {externalLink && (
          <div className="modal-footer">
            <ButtonLink href={externalLink.url} variant="primary">
              {externalLink.label}
            </ButtonLink>
          </div>
        )}
      </div>
    </div>
  );
}
