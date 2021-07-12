import React, { useRef, useEffect } from "react";

export function CanvasProvider({ script, style, is404 }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const dispose = script(canvas, is404);

    return () => {
      dispose();
    };
  }, []);

  return <canvas className="is-unclickable" style={style} ref={ref} />;
}
