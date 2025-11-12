import { useCallback } from "react";

import useCanvasSize from "./use-canvas-size";

export const useQueryMedia = () => {
  const { width } = useCanvasSize();

  const queryMedia = useCallback(
    <T>(values: { base: T; md?: T; lg?: T }): T => {
      const breakpoints = {
        md: 768,
        lg: 1024,
      };

      if (width >= breakpoints.lg && values.lg !== undefined) {
        return values.lg;
      }

      if (width >= breakpoints.md && values.md !== undefined) {
        return values.md;
      }

      return values.base;
    },
    [width],
  );

  return queryMedia;
};
