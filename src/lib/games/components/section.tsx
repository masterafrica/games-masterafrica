import { Group } from "react-konva";
import { ReactElement, cloneElement, Children } from "react";

interface SectionProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  flexDirection?: "row" | "column";
  justifyContent?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around";
  alignItems?: "flex-start" | "center" | "flex-end";
  gap?: number;
  padding?: number;
  children: React.ReactNode;
}

const Section = ({
  x = 0,
  y = 0,
  width = 0,
  height = 0,
  flexDirection = "row",
  justifyContent = "flex-start",
  alignItems = "flex-start",
  gap = 0,
  padding = 0,
  children,
}: SectionProps) => {
  const childArray = Children.toArray(children) as ReactElement[];
  const childCount = childArray.length;

  const getMainAxisSize = (child: ReactElement) => {
    const childWidth = child.props.width || 0;
    const childHeight = child.props.height || 0;

    return flexDirection === "row" ? childWidth : childHeight;
  };

  const getCrossAxisSize = (child: ReactElement) => {
    const childWidth = child.props.width || 0;
    const childHeight = child.props.height || 0;

    return flexDirection === "row" ? childHeight : childWidth;
  };

  const availableMainAxis =
    (flexDirection === "row" ? width : height) - padding * 2;
  const availableCrossAxis =
    (flexDirection === "row" ? height : width) - padding * 2;

  const totalChildSize = childArray.reduce(
    (sum, child) => sum + getMainAxisSize(child),
    0,
  );
  const totalGap = gap * (childCount - 1);
  const remainingSpace = availableMainAxis - totalChildSize - totalGap;

  const getMainAxisStart = () => {
    switch (justifyContent) {
      case "center":
        return remainingSpace / 2;
      case "flex-end":
        return remainingSpace;
      case "space-between":
        return 0;
      case "space-around":
        return remainingSpace / (childCount * 2);
      default:
        return 0;
    }
  };

  const getMainAxisGap = () => {
    switch (justifyContent) {
      case "space-between":
        return childCount > 1 ? remainingSpace / (childCount - 1) + gap : gap;
      case "space-around":
        return remainingSpace / childCount + gap;
      default:
        return gap;
    }
  };

  const getCrossAxisPosition = (child: ReactElement) => {
    const childSize = getCrossAxisSize(child);

    switch (alignItems) {
      case "center":
        return (availableCrossAxis - childSize) / 2;
      case "flex-end":
        return availableCrossAxis - childSize;
      default:
        return 0;
    }
  };

  let currentMainAxis = getMainAxisStart() + padding;
  const mainAxisGap = getMainAxisGap();

  const positionedChildren = childArray.map((child, index) => {
    const crossAxisPos = getCrossAxisPosition(child) + padding;
    const mainAxisPos = currentMainAxis;

    const childX = flexDirection === "row" ? mainAxisPos : crossAxisPos;
    const childY = flexDirection === "row" ? crossAxisPos : mainAxisPos;

    currentMainAxis += getMainAxisSize(child) + mainAxisGap;

    return cloneElement(child, {
      ...child.props,
      x: childX,
      y: childY,
      key: index,
    });
  });

  return (
    <Group x={x} y={y}>
      {positionedChildren}
    </Group>
  );
};

export default Section;
