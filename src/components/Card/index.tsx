import { motion, useSpring, useTransform } from "motion/react";
import "./index.css";
import {
  useState,
  type CSSProperties,
  type MouseEvent,
  type TouchEvent,
} from "react";
import { adjust, clamp, round } from "../../lib/Math";

const springInteractSettings = { stiffness: 66, damping: 5 };

export function Card() {
  const [interacting, setInteracting] = useState(false);
  const springGlareX = useSpring(50, springInteractSettings);
  const springGlareY = useSpring(50, springInteractSettings);
  const springGlareOpacity = useSpring(0, springInteractSettings);

  const springRotateX = useSpring(0, springInteractSettings);
  const springRotateY = useSpring(0, springInteractSettings);

  const springBackgroundX = useSpring(50, springInteractSettings);
  const springBackgroundY = useSpring(50, springInteractSettings);

  const updateSprings = (
    background: { x: number; y: number },
    rotate: { x: number; y: number },
    glare: { x: number; y: number; opacity: number },
  ) => {
    springBackgroundX.set(background.x);
    springBackgroundY.set(background.y);

    springRotateX.set(rotate.x);
    springRotateY.set(rotate.y);

    springGlareX.set(glare.x);
    springGlareY.set(glare.y);
    springGlareOpacity.set(glare.opacity);
    console.log(glare.opacity);
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
        x: adjust(percent.x, 0, 100, 37, 63),
        y: adjust(percent.y, 0, 100, 33, 67),
      },
      {
        x: round(-(center.x / 3.5)),
        y: round(center.y / 2),
      },
      { x: round(percent.x), y: round(percent.y), opacity: 1 },
    );
  };

  // const interactTouchMove = (e: TouchEvent) => {
  //   const target = e.target as HTMLButtonElement;
  //   const rect = target.getBoundingClientRect();
  //   const absolute = {
  //     x: e.touches[0].clientX - rect.left, // get mouse position from left
  //     y: e.touches[0].clientY - rect.top, // get mouse position from right
  //   };

  //   const percent = {
  //     x: clamp(round((100 / rect.width) * absolute.x)),
  //     y: clamp(round((100 / rect.height) * absolute.y)),
  //   };

  //   const center = {
  //     x: percent.x - 50,
  //     y: percent.y - 50,
  //   };

  //   updateSprings(
  //     {
  //       x: adjust(percent.x, 0, 100, 37, 63),
  //       y: adjust(percent.y, 0, 100, 33, 67),
  //     },
  //     {
  //       x: round(-(center.x / 3.5)),
  //       y: round(center.y / 2),
  //     },
  //     { x: round(percent.x), y: round(percent.y), opacity: 1 },
  //   );
  // };

  const interactEnd = (e: MouseEvent) => {
    if (!interacting) {
      // springRotateX.jump(0);
      // springRotateY.jump(0);

      // springGlareX.jump(50);
      // springGlareY.jump(50);
      // springGlareOpacity.jump(0);

      // springBackgroundX.jump(50);
      // springBackgroundY.jump(50);
      return;
    }

    setInteracting(false);

    springRotateX.jump(0);
    springRotateY.jump(0);

    springGlareX.jump(50);
    springGlareY.jump(50);
    springGlareOpacity.jump(0);

    springBackgroundX.jump(50);
    springBackgroundY.jump(50);
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
  const rotateX = useTransform(() => `${springRotateX.get()}deg`);
  const rotateY = useTransform(() => `${springRotateY.get()}deg`);
  const backgroundX = useTransform(() => `${springBackgroundX.get()}%`);
  const backgroundY = useTransform(() => `${springBackgroundY.get()}%`);
  const springGlareXPer = useTransform(() => `${springGlareX.get()}%`);
  const springGlareYPer = useTransform(() => `${springGlareY.get()}%`);

  return (
    <motion.div
      className="card"
      style={
        {
          "--pointer-x": springGlareXPer,
          "--pointer-y": springGlareYPer,
          "--pointer-from-center": pointerFromCenter,
          "--pointer-from-top": pointerFromTop,
          "--pointer-from-left": pointerFromLeft,
          "--card-opacity": springGlareOpacity,
          "--rotate-x": rotateX,
          "--rotate-y": rotateY,
          "--background-x": backgroundX,
          "--background-y": backgroundY,
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
