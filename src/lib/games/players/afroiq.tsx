import { Circle, Group, Rect, Text } from "react-konva";
import { useEffect, useRef, useState } from "react";

import Img from "../components/img";
import Button from "../components/button";
import Section from "../components/section";
import useCanvasSize from "../hooks/use-canvas-size";
import { useQueryMedia } from "../hooks/use-query-media";
import Loader, { LoaderRef } from "../components/loader";

const Afroiq = () => {
  const { width, height } = useCanvasSize();
  const queryMedia = useQueryMedia();
  const [loading, setLoading] = useState(true);
  const ref = useRef<LoaderRef>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      ref.current?.start(() => {
        setLoading(false);
      });
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return (
      <Loader
        ref={ref}
        height={height}
        imageUrl="/images/games/afro-iq.jpg"
        width={width}
      />
    );
  }

  return (
    <Group>
      <Img resizeMode="cover" src="/images/games/bgs/bg-1.png" />

      <Section
        alignItems="center"
        flexDirection="row"
        height={queryMedia({ base: 60, md: 70, lg: 80 })}
        justifyContent="space-between"
        padding={queryMedia({ base: 10, md: 15, lg: 20 })}
        width={width}
        x={0}
        y={0}
      >
        <Button
          backgroundColor="#FA0000"
          height={queryMedia({ base: 40, md: 50, lg: 50 })}
          text="Exit"
          width={queryMedia({ base: 80, md: 100, lg: 120 })}
          onClick={() => alert("Exit clicked")}
        />

        <Group
          height={queryMedia({ base: 40, md: 50, lg: 60 })}
          width={queryMedia({ base: 120, md: 140, lg: 150 })}
        >
          <Rect
            cornerRadius={queryMedia({ base: 20, md: 22, lg: 25 })}
            fill="#C56101"
            height={queryMedia({ base: 40, md: 50, lg: 60 })}
            width={queryMedia({ base: 120, md: 140, lg: 150 })}
            x={0}
            y={0}
          />

          <Circle
            fill="#FFC723"
            radius={queryMedia({ base: 14, md: 16, lg: 18 })}
            strokeWidth={3}
            x={queryMedia({ base: 25, md: 30, lg: 35 })}
            y={queryMedia({ base: 20, md: 25, lg: 30 })}
          />

          <Circle
            radius={queryMedia({ base: 9, md: 10, lg: 12 })}
            stroke="#fff"
            strokeWidth={1}
            x={queryMedia({ base: 25, md: 30, lg: 35 })}
            y={queryMedia({ base: 20, md: 25, lg: 30 })}
          />

          <Text
            align="center"
            fill="white"
            fontSize={queryMedia({ base: 20, md: 24, lg: 28 })}
            fontStyle="bold"
            height={queryMedia({ base: 40, md: 50, lg: 60 })}
            text="350"
            verticalAlign="middle"
            width={queryMedia({ base: 50, md: 55, lg: 60 })}
            x={queryMedia({ base: 45, md: 52, lg: 60 })}
            y={0}
          />
        </Group>
      </Section>

      

      {/* initial */}
      {/* <Section
        alignItems="center"
        flexDirection="column"
        gap={queryMedia({ base: 20, md: 30, lg: 40 })}
        height={height - queryMedia({ base: 60, md: 70, lg: 80 })}
        justifyContent="center"
        padding={queryMedia({ base: 20, md: 25, lg: 30 })}
        width={width}
        x={0}
        y={queryMedia({ base: 80, md: 100, lg: 150 })}
      >
        <Text
          align="center"
          fill="#FF7101"
          fontSize={queryMedia({ base: 70, md: 60, lg: 80 })}
          fontStyle="bold"
          height={queryMedia({ base: 60, md: 90, lg: 120 })}
          stroke="#fff"
          strokeWidth={3}
          text="Afro IQ"
          width={queryMedia({ base: 300, md: 400, lg: 500 })}
        />

        <Button
          backgroundColor="#4B4EFC"
          fontSize={queryMedia({ base: 20, md: 22, lg: 24 })}
          height={queryMedia({ base: 50, md: 60, lg: 70 })}
          stroke="#fff"
          strokeWidth={queryMedia({ base: 3, md: 4, lg: 5 })}
          text="Play"
          width={queryMedia({ base: 180, md: 220, lg: 250 })}
          onClick={() => alert("Start clicked")}
        />
      </Section> */}
    </Group>
  );
};

export default Afroiq;
