import React, { useRef, useEffect } from "react";

export function CanvasProvider({ script, style, is404 }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    script(canvas, is404);
  }, []);

  return <canvas style={style} ref={ref} />;
}
