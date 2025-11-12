import { Stage, Layer } from "react-konva";

import useCanvasSize from "./hooks/use-canvas-size";
import Afroiq from "./players/afroiq";

export const GameCanvas = ({ gameId: _gameId }: { gameId: string }) => {
  const { width, height } = useCanvasSize();

  return (
    <div
      className="w-full h-full flex items-center justify-center bg-black mx-auto"
      style={{ width, height }}
    >
      <Stage className="bg-black" height={height} width={width}>
        <Layer>
          <Afroiq />
        </Layer>
      </Stage>
    </div>
  );
};
