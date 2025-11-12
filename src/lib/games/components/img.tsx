import useImage from "use-image";
import Konava from "konva";
import { Image, KonvaNodeComponent } from "react-konva";

import useCanvasSize from "../hooks/use-canvas-size";
import { calculateCoverImageDimensions } from "../utils/image";

type KonvaImageProps = KonvaNodeComponent<Konava.Image, Konava.ImageConfig>;

interface Props
  extends Omit<
    KonvaImageProps,
    "image" | "getNativeNode" | "getPublicInstance"
  > {
  src: string;
  width?: number;
  height?: number;
  resizeMode?: "cover";
}

const Img = ({ src, width, height, resizeMode, ...rest }: Props) => {
  const { height: ch, width: cw } = useCanvasSize();

  const [image] = useImage(src);
  const {
    width: imgWidth,
    height: imgHeight,
    x: imgX,
    y: imgY,
  } = calculateCoverImageDimensions(image, cw, ch);

  return (
    <Image
      height={resizeMode == "cover" ? imgHeight : height}
      image={image}
      width={resizeMode == "cover" ? imgWidth : width}
      x={imgX}
      y={imgY}
      {...rest}
    />
  );
};

export default Img;
