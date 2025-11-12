import { useEffect, useState } from "react";

export default () => {
  const [size, setSize] = useState({
    width: window.innerWidth * 0.85,
    height: window.innerHeight * 0.7,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth * 0.85,
        height: window.innerHeight * 0.7,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
};
