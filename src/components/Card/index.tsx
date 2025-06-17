import { motion, useSpring, useTransform } from "motion/react";
import "./index.css";
import {
  useState,
  type CSSProperties,
  type MouseEvent,
  type TouchEvent,
} from "react";
import { clamp, round } from "../../lib/Math";

const springInteractSettings = { stiffness: 0.066, damping: 0.25 };
const springPopoverSettings = { stiffness: 0.033, damping: 0.45 };

export function Card() {
  const [interacting, setInteracting] = useState(false);
  const springGlareX = useSpring(50, springInteractSettings);
  const springGlareY = useSpring(50, springInteractSettings);
  const springGlareOpacity = useSpring(0, springInteractSettings);

  const springRotateX = useSpring(0, springInteractSettings);
  const springRotateY = useSpring(0, springInteractSettings);
  const springRotateDX = useSpring(0, springPopoverSettings);
  const springRotateDY = useSpring(0, springPopoverSettings);

  const updateSprings = (
    rotate: { x: number; y: number },
    glare: { x: number; y: number; opacity: number },
  ) => {
    springRotateX.set(rotate.x);
    springRotateY.set(rotate.y);

    springGlareX.set(glare.x);
    springGlareY.set(glare.y);
    springGlareOpacity.set(glare.opacity);
    console.log(glare);
  };

  const interact = (e: MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    const rect = target.getBoundingClientRect();
    const absolute = {
      x: e.clientX - rect.left, // get mouse position from left
      y: e.clientY - rect.top, // get mouse position from right
    };

    const percent = {
      x: clamp(round((100 / rect.width) * absolute.x)),
      y: clamp(round((100 / rect.height) * absolute.y)),
    };

    const center = {
      x: percent.x - 50,
      y: percent.y - 50,
    };

    updateSprings(
      {
        x: round(-(center.x / 3.5)),
        y: round(center.y / 2),
      },
      { x: round(percent.x), y: round(percent.y), opacity: 1 },
    );
  };

  const interactTouchMove = (e: TouchEvent) => {
    const target = e.target as HTMLButtonElement;
    const rect = target.getBoundingClientRect();
    const absolute = {
      x: e.touches[0].clientX - rect.left, // get mouse position from left
      y: e.touches[0].clientY - rect.top, // get mouse position from right
    };

    const percent = {
      x: clamp(round((100 / rect.width) * absolute.x)),
      y: clamp(round((100 / rect.height) * absolute.y)),
    };

    const center = {
      x: percent.x - 50,
      y: percent.y - 50,
    };

    updateSprings(
      {
        x: round(-(center.x / 3.5)),
        y: round(center.y / 2),
      },
      { x: round(percent.x), y: round(percent.y), opacity: 1 },
    );
  };

  const interactEnd = (e: MouseEvent) => {
    setTimeout(function () {
      setInteracting(false);

      // springRotate.stiffness = snapStiff;
      // springRotate.damping = snapDamp;
      // springRotate.set({ x: 0, y: 0 }, { soft: 1 });
      springRotateX.set(0);
      springRotateY.set(0);

      springGlareX.set(50);
      springGlareY.set(50);
      springGlareOpacity.set(0);

      // springBackground.stiffness = snapStiff;
      // springBackground.damping = snapDamp;
      // springBackground.set({ x: 50, y: 50 }, { soft: 1 });
    }, 500);
  };

  const pointerFromCenter = useTransform(() =>
    clamp(
      Math.sqrt(
        (springGlareY.get() - 50) * (springGlareY.get() - 50) +
          (springGlareX.get() - 50) * (springGlareX.get() - 50),
      ) / 50,
      0,
      1,
    ),
  );
  const pointerFromTop = useTransform(() => springGlareY.get() / 100);
  const pointerFromLeft = useTransform(() => springGlareX.get() / 100);
  const rotateX = useTransform(() => `${springRotateX.get() + springRotateDX.get()}deg`);
  const rotateY = useTransform(() => `${springRotateY.get() + springRotateDY.get()}deg`);

  return (
    <motion.div
      className="card"
      style={
        {
          "--pointer-x": springGlareX,
          "--pointer-y": springGlareY,
          "--pointer-from-center": pointerFromCenter,
          "--pointer-from-top": pointerFromTop,
          "--pointer-from-left": pointerFromLeft,
          "--card-opacity": springGlareOpacity,
          "--rotate-x": rotateX,
          "--rotate-y": rotateY,
        } as CSSProperties
      }
    >
      <div className="card-translator">
        <button
          className="card-rotator"
          onMouseMove={interact}
          onMouseOut={interactEnd}
        >
          <div className="card-back">
            <img src="/coscard_back.jpg" />
          </div>
          <div className="card-front">
            <img src="/coscard_front.jpg" />
            <div className="card-shine"></div>
            <div className="card-glare"></div>
          </div>
        </button>
      </div>
    </motion.div>
  );
}
