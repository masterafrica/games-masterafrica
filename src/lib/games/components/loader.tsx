import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Group, Rect, Text } from "react-konva";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import Img from "./img";

interface Props {
  width: number;
  height: number;
  imageUrl: string;
}

gsap.registerPlugin(useGSAP);
export interface LoaderRef {
  start: (cb?: () => void) => void;
}

const Loader = forwardRef<LoaderRef, Props>((props: Props, ref) => {
  const { width, height, imageUrl } = props;
  const [progress, setProgress] = useState(0);
  const progressRef = useRef({ value: 0 });
  const tl = gsap.timeline();

  //   useGSAP(
  //     () => {
  // tl.to(progressRef.current, {
  //     duration: 3,
  //     ease: "power2.inOut",
  //     value: 100,
  //     onUpdate: () => {
  //       setProgress(progressRef.current.value);
  //     },
  //   });
  //     },
  //     {
  //       scope: progressRef,
  //     }
  //   );

  useImperativeHandle(ref, () => ({
    start: (cb) => {
      tl.to(progressRef.current, {
        duration: 3,
        ease: "power2.inOut",
        value: 100,
        onUpdate: () => {
          setProgress(progressRef.current.value);
        },
        onComplete: cb,
      });
    },
  }));

  return (
    <Group>
      <Group>
        <Img src={imageUrl} resizeMode="cover" />
        <Rect
          fill="black"
          height={height}
          opacity={0.5}
          width={width}
          x={0}
          y={0}
        />
      </Group>

      <Group x={width / 3} y={height - 100}>
        <Rect
          cornerRadius={30}
          fill="white"
          height={25}
          width={width / 3}
          x={0}
          y={0}
        />
        <Rect
          cornerRadius={30}
          fill="orange"
          height={25}
          width={(width / 3) * (progress / 100)}
          x={0}
          y={0}
        />

        <Text
          align="center"
          fill="white"
          text="Loading"
          x={width / 3 / 2 - 25}
          y={40}
        />
      </Group>
    </Group>
  );
});

Loader.displayName = "Loader";
export default Loader;
