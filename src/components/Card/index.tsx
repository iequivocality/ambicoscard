import { motion, useSpring, useTransform } from "motion/react";
import {
  useEffect,
  useState,
  type CSSProperties,
  type MouseEvent,
  type TouchEvent,
} from "react";
import { adjust, clamp, round } from "../../lib/Math";
import type { CardEntity } from "../../data";

import "./index.css";


export function Card({ card }: { card: CardEntity }) {
  const [loading, setLoading] = useState(true);
  const [interacting, setInteracting] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const springGlareX = useSpring(50);
  const springGlareY = useSpring(50);
  const springGlareOpacity = useSpring(0.25);

  const springRotateX = useSpring(0);
  const springRotateY = useSpring(0);

  const springRotateDX = useSpring(0);

  const springBackgroundX = useSpring(50);
  const springBackgroundY = useSpring(50);

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
  };

  const interact = (e: MouseEvent<HTMLButtonElement>) => {
    setInteracting(true);
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

  const interactTouchMove = (e: TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setInteracting(true);
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

  const interactEnd = () => {
    setInteracting(false);

    setTimeout(() => {
      springRotateX.set(0);
      springRotateY.set(0);

      springGlareX.set(50);
      springGlareY.set(50);
      springGlareOpacity.set(0.25);

      springBackgroundX.set(50);
      springBackgroundY.set(50);
    }, 500);
  };

  useEffect(() => {
    springRotateDX.set(flipped ? 180 : 0);
  }, [flipped]);

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

  const springGlareXPer = useTransform(() => `${springGlareX.get()}%`);
  const springGlareYPer = useTransform(() => `${springGlareY.get()}%`);
  const pointerFromTop = useTransform(() => springGlareY.get() / 100);
  const pointerFromLeft = useTransform(() => springGlareX.get() / 100);
  const rotateX = useTransform(
    () => `${springRotateX.get() + springRotateDX.get()}deg`,
  );
  const rotateY = useTransform(() => `${springRotateY.get()}deg`);
  const backgroundX = useTransform(() => `${springBackgroundX.get()}%`);
  const backgroundY = useTransform(() => `${springBackgroundY.get()}%`);

  return (
    <motion.div
      className={["card", loading ? "loading" : ""].join(" ")}
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
      transition={
        interacting
          ? { stiffness: 69, damping: 9 }
          : { stiffness: 6, damping: 1 }
      }
    >
      <div className="card-translator">
        <button
          className="card-rotator"
          onClick={() => setFlipped(!flipped)}
          onMouseMove={interact}
          onMouseOut={interactEnd}
          onTouchEnd={interactEnd}
          onTouchMove={interactTouchMove}
        >
          <div className="card-back">
            <img
              {...card.back.main}
              loading="lazy"
            />
            {flipped && (
              <>
                <div className="card-shine"></div>
                <div className="card-glare"></div>
              </>
            )}
          </div>
          <div className="card-front">
            <img
              {...card.front.main}
              loading="lazy"
              onLoad={() => {
                setLoading(false);
              }}
            />
            <div className="card-shine"></div>
            <div className="card-glare"></div>
          </div>
        </button>
      </div>
    </motion.div>
  );
}
