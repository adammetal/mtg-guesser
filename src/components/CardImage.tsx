"use client";

import { animated, useSpring } from "@react-spring/web";
import Image from "next/image";
import { useRef } from "react";
import { useGesture } from "@use-gesture/react";

const calcX = (y: number, ly: number) =>
  -(y - ly - window.innerHeight / 2) / 20;

const calcY = (x: number, lx: number) => (x - lx - window.innerWidth / 2) / 20;

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

export default function CardImage({ src }: { src: string }) {
  const domTarget = useRef<HTMLDivElement>(null);

  const [{ rotateX, rotateY, rotateZ, scale, x, y }, api] = useSpring(
    () => ({
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      zoom: 0,
      scale: 1,
      x: 0,
      y: 0,
      config: { mass: 5, tension: 350, friction: 40 },
    })
  );

  useGesture(
    {
      onHover({ hovering }) {
        !hovering &&
          api.start({
            rotateX: 0,
            rotateY:  0,
            rotateZ: 0,
            scale: 1,
          });
      },
      onMove({ dragging, xy: [px, py] }) {
        !dragging &&
          api.start({
            scale: 1.1,
            rotateX: calcX(py, y.get()),
            rotateY: calcY(px, x.get()),
          });
      },
    },
    { target: domTarget, eventOptions: { passive: true } }
  );

  return (
    <animated.div
      ref={domTarget}
      className="shadow-2xl p-4 bg-white select-none"
      style={{
        transform: "perspective(800px)",
        rotateX,
        rotateY,
        rotateZ,
        scale,
      }}
    >
      <Image
        placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(745, 1040))}`}
        alt="Guess the card"
        width={745}
        height={1040}
        src={src}
        className="pointer-events-none"
        style={{
          width: '100%',
          height: 'auto'
        }}
      />
    </animated.div>
  );
}
