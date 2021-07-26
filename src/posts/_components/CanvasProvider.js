import React, { useRef, useEffect, useState } from "react";

function Blur({ blured, children }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          filter: blured ? "blur(5px) brightness(50%)" : "none",
          transition: "filter 200ms ease-in-out",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function Text({ blured, children, onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      style={{
        position: "relative",
      }}
      className="blur-container"
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      onClick={onClick}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 20,
          display: blured ? "flex" : "none",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          pointerEvents: "none",
          transform: hover ? "scale(1.3)" : "scale(1.0)",
          transition: "transform 200ms ease-in-out",
        }}
      >
        <h2>⏸</h2>
        <h2>Click to play.</h2>
      </div>
      {children}
    </div>
  );
}

const data = {
  ID: 0,
  obeserever: undefined,
};

export function CanvasProvider({ script, style }) {
  const ref = useRef(null);
  const firstRender = useRef(true);
  const [blured, setBlured] = useState(true);
  const [callback, setCallback] = useState();
  const [id, setId] = useState();

  useEffect(async () => {
    if (firstRender.current) {
      const canvas = ref.current;
      const _callback = await script(canvas);
      setCallback(() => _callback);
      _callback(0);

      firstRender.current = false;

      data.obeserever = new IntersectionObserver(([{ isIntersecting }]) => {
        if (!isIntersecting) {
          setBlured(true);
        }
      });
      data.obeserever.observe(canvas);
    }

    const animate = (time) => {
      callback(time);
      data.ID = requestAnimationFrame(animate);
    };

    if (!blured) {
      data.ID = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(data.ID);
    }

    return () => {
      if (data.obeserever) data.obeserever.disconnect();
    };
  }, [blured]);

  function onClick(e) {
    setBlured(e.shiftKey);
  }

  return (
    <Text blured={blured} onClick={onClick}>
      <Blur blured={blured}>
        <canvas
          style={{
            zIndex: "10",
            ...style,
          }}
          ref={ref}
        />
      </Blur>
    </Text>
  );
}
