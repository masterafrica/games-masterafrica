interface ButtonProps {
  text: string;
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
    <button
      onClick={onClick}
      style={{
        width,
        height,
        backgroundColor,
        color: textColor,
        borderRadius: cornerRadius,
        fontSize,
        fontWeight: "bold",
        fontFamily: "Arial, sans-serif",
        border: stroke ? `${strokeWidth}px solid ${stroke}` : "none",
        cursor: "pointer",
        outline: "none",
        transition: "transform 0.1s ease",
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = "scale(0.95)";
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      {text}
    </button>
  );
};

export default Button;
