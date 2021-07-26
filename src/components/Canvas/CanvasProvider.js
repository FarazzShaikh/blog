import React, { useRef, useEffect } from "react";

export function CanvasProvider({ script, style, is404, setError }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;

    let dispose;
    try {
      dispose = script(canvas, is404);
    } catch (error) {
      console.error(error);
      setError(error);
    }

    return () => {
      if (dispose) dispose();
    };
  }, [ref, is404, script]);

  return <canvas className="is-unclickable" style={style} ref={ref} />;
}
