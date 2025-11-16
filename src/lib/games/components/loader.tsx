import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import gsap from "gsap";

interface Props {
  imageUrl: string;
}

export interface LoaderRef {
  start: (cb?: () => void) => void;
}

const Loader = forwardRef<LoaderRef, Props>((props: Props, ref) => {
  const { imageUrl } = props;
  const [progress, setProgress] = useState(0);
  const progressRef = useRef({ value: 0 });
  const animationRef = useRef<gsap.core.Tween | null>(null);

  useImperativeHandle(ref, () => ({
    start: (cb) => {
      // Reset progress
      setProgress(0);
      progressRef.current.value = 0;

      // Kill any existing animation
      if (animationRef.current) {
        animationRef.current.kill();
      }

      // Create new animation
      animationRef.current = gsap.to(progressRef.current, {
        duration: 3,
        ease: "power2.inOut",
        value: 100,
        onUpdate: () => {
          setProgress(Math.round(progressRef.current.value));
        },
        onComplete: () => {
          setProgress(100);
          cb?.();
        },
      });
    },
  }));

  return (
    <div className="relative w-full h-full">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="absolute inset-0 bg-black opacity-50" />

      <div
        className="absolute left-1/2 transform -translate-x-1/2"
        style={{
          bottom: 100,
          width: "33.333%",
        }}
      >
        <div
          className="relative bg-white"
          style={{
            height: 25,
            borderRadius: 30,
          }}
        >
          <div
            className="absolute top-0 left-0 bg-orange-500"
            style={{
              height: "25px",
              borderRadius: 30,
              width: `${progress}%`,
            }}
          />
        </div>

        <div className="text-white text-center mt-4">Loading</div>
      </div>
    </div>
  );
});

Loader.displayName = "Loader";
export default Loader;
