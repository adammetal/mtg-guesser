"use client";

import { animated, useSpring } from "@react-spring/web";
import { useGesture } from "@use-gesture/react";
import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Symbol({
  src,
  name,
}: {
  src: StaticImageData;
  name: string;
}) {
  return function SymbolComp({
    onChange,
    active,
  }: {
    onChange: (active: boolean) => void;
    active: boolean;
  }) {
    //const [active, setActive] = useState(false);

    const domTarget = useRef<HTMLDivElement>(null);

    const [springs, api] = useSpring(() => ({
      y: active ? -15 : 0,
      opacity: 1,
    }), []);

    useEffect(() => {
      api.start({ y: active ? -15 : 0 })
    }, [active, api]);

    useGesture(
      {
        onHover({ hovering }) {
          !hovering && api.start({ opacity: 1 });
        },
        onMove() {
          api.start({ opacity: 0.5 });
        },
      },
      { target: domTarget }
    );

    const toggle = () => {
      const value = !active;
      //setActive(value);
      onChange(value);
      //api.start({ y: value ? -15 : 0 });
    };

    return (
      <animated.div
        ref={domTarget}
        onClick={toggle}
        style={{ ...springs }}
        className="bg-white p-2 cursor-pointer"
      >
        <Image src={src} width={60} height={60} alt={name} />
      </animated.div>
    );
  };
}
