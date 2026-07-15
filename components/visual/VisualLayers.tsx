"use client";

import { useEffect } from "react";

const DEFAULT_X = "50vw";
const DEFAULT_Y = "18vh";

function resetPointerVariables(root: HTMLElement) {
  root.style.setProperty("--pointer-x", DEFAULT_X);
  root.style.setProperty("--pointer-y", DEFAULT_Y);
  root.style.setProperty("--pointer-shift-x", "0px");
  root.style.setProperty("--pointer-shift-y", "0px");
  root.style.setProperty("--pointer-opacity", "0");
}

export default function VisualLayers() {
  useEffect(() => {
    const root = document.documentElement;

    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    const finePointerQuery = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    );

    let frameId = 0;
    let pointerX = window.innerWidth * 0.5;
    let pointerY = window.innerHeight * 0.18;

    const canAnimate = () =>
      !reducedMotionQuery.matches && finePointerQuery.matches;

    const applyPointerPosition = () => {
      frameId = 0;

      if (!canAnimate()) {
        resetPointerVariables(root);
        return;
      }

      const width = Math.max(window.innerWidth, 1);
      const height = Math.max(window.innerHeight, 1);

      const normalizedX = pointerX / width - 0.5;
      const normalizedY = pointerY / height - 0.5;

      root.style.setProperty("--pointer-x", `${pointerX}px`);
      root.style.setProperty("--pointer-y", `${pointerY}px`);
      root.style.setProperty(
        "--pointer-shift-x",
        `${normalizedX * 12}px`,
      );
      root.style.setProperty(
        "--pointer-shift-y",
        `${normalizedY * 9}px`,
      );
      root.style.setProperty("--pointer-opacity", "1");
    };

    const requestUpdate = () => {
      if (frameId !== 0) return;

      frameId = window.requestAnimationFrame(
        applyPointerPosition,
      );
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!canAnimate() || event.pointerType === "touch") return;

      pointerX = event.clientX;
      pointerY = event.clientY;
      requestUpdate();
    };

    const handlePointerLeave = () => {
      root.style.setProperty("--pointer-opacity", "0");
      root.style.setProperty("--pointer-shift-x", "0px");
      root.style.setProperty("--pointer-shift-y", "0px");
    };

    const handleCapabilityChange = () => {
      if (!canAnimate()) {
        resetPointerVariables(root);
        return;
      }

      pointerX = window.innerWidth * 0.5;
      pointerY = window.innerHeight * 0.18;
      requestUpdate();
    };

    resetPointerVariables(root);

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });

    document.documentElement.addEventListener(
      "pointerleave",
      handlePointerLeave,
    );

    window.addEventListener("blur", handlePointerLeave);

    reducedMotionQuery.addEventListener(
      "change",
      handleCapabilityChange,
    );

    finePointerQuery.addEventListener(
      "change",
      handleCapabilityChange,
    );

    return () => {
      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener(
        "pointermove",
        handlePointerMove,
      );

      document.documentElement.removeEventListener(
        "pointerleave",
        handlePointerLeave,
      );

      window.removeEventListener("blur", handlePointerLeave);

      reducedMotionQuery.removeEventListener(
        "change",
        handleCapabilityChange,
      );

      finePointerQuery.removeEventListener(
        "change",
        handleCapabilityChange,
      );

      resetPointerVariables(root);
    };
  }, []);

  return (
    <div className="pointer-atmosphere" aria-hidden="true">
      <div className="pointer-atmosphere__far" />
      <div className="pointer-atmosphere__near" />
      <div className="pointer-atmosphere__halo" />

      <style jsx>{`
        .pointer-atmosphere {
          position: fixed;
          inset: 0;
          z-index: 0;
          overflow: hidden;
          opacity: var(--pointer-opacity);
          pointer-events: none;
          contain: strict;
          transition: opacity 0.35s var(--ease);
        }

        .pointer-atmosphere__far,
        .pointer-atmosphere__near,
        .pointer-atmosphere__halo {
          position: absolute;
          pointer-events: none;
        }

        .pointer-atmosphere__far,
        .pointer-atmosphere__near {
          inset: -30px;
        }

        .pointer-atmosphere__far {
          opacity: 0.32;
          background-image:
            radial-gradient(
              circle,
              rgba(17, 17, 20, 0.18) 0 0.55px,
              transparent 0.75px
            ),
            radial-gradient(
              circle,
              rgba(37, 99, 235, 0.1) 0 0.65px,
              transparent 0.85px
            );
          background-position:
            0 0,
            19px 27px;
          background-size:
            43px 43px,
            71px 71px;
          transform: translate3d(
            calc(var(--pointer-shift-x) * -0.45),
            calc(var(--pointer-shift-y) * -0.45),
            0
          );
          mask-image: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.74),
            rgba(0, 0, 0, 0.18) 58%,
            transparent 88%
          );
        }

        .pointer-atmosphere__near {
          opacity: 0.2;
          background-image:
            radial-gradient(
              circle,
              rgba(17, 17, 20, 0.22) 0 0.7px,
              transparent 0.9px
            ),
            radial-gradient(
              circle,
              rgba(255, 255, 255, 0.9) 0 0.8px,
              transparent 1px
            );
          background-position:
            13px 9px,
            41px 33px;
          background-size:
            89px 89px,
            113px 113px;
          transform: translate3d(
            calc(var(--pointer-shift-x) * 0.7),
            calc(var(--pointer-shift-y) * 0.7),
            0
          );
          mask-image: radial-gradient(
            circle 520px at var(--pointer-x) var(--pointer-y),
            rgba(0, 0, 0, 0.75),
            rgba(0, 0, 0, 0.2) 48%,
            transparent 78%
          );
        }

        .pointer-atmosphere__halo {
          top: var(--pointer-y);
          left: var(--pointer-x);
          width: min(44vw, 520px);
          aspect-ratio: 1;
          border-radius: 50%;
          opacity: 0.72;
          background: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.92) 0%,
            rgba(224, 231, 244, 0.3) 32%,
            rgba(37, 99, 235, 0.035) 54%,
            transparent 74%
          );
          transform: translate3d(-50%, -50%, 0);
        }

        @media (max-width: 900px),
          (hover: none),
          (pointer: coarse),
          (prefers-reduced-motion: reduce) {
          .pointer-atmosphere {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
