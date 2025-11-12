import { Group, Rect, Text } from "react-konva";

interface ButtonProps {
  text: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  backgroundColor?: string;
  textColor?: string;
  cornerRadius?: number;
  fontSize?: number;
  stroke?: string;
  strokeWidth?: number;
  onClick?: () => void;
}

const Button = ({
  text,
  x = 0,
  y = 0,
  width = 150,
  height = 60,
  backgroundColor = "#FA0000",
  textColor = "#FFFFFF",
  cornerRadius = 10,
  fontSize = 24,
  stroke,
  strokeWidth = 0,
  onClick,
}: ButtonProps) => {
  return (
    <Group x={x} y={y} onClick={onClick} onTap={onClick}>
      <Rect
        cornerRadius={cornerRadius}
        fill={backgroundColor}
        height={height}
        stroke={stroke}
        strokeWidth={strokeWidth}
        width={width}
        x={0}
        y={0}
      />
      {/* <Rect
        cornerRadius={cornerRadius}
        fill="rgba(255, 100, 50, 0.8)"
        height={height * 0.4}
        width={width}
        x={0}
        y={0}
      /> */}
      <Text
        align="center"
        fill={textColor}
        fontFamily="Arial, sans-serif"
        fontSize={fontSize}
        fontStyle="bold"
        height={height}
        text={text}
        verticalAlign="middle"
        width={width}
        x={0}
        y={0}
      />
    </Group>
  );
};

export default Button;
