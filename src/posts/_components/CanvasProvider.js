import React, { useRef, useEffect, useState } from "react";

function webgl_support() {
  try {
    var canvas = document.createElement("canvas");
    return !!window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
  } catch (e) {
    return false;
  }
}

function Blur({ blured, children, error, gl }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        cursor: gl && !error ? "pointer" : "default",
      }}
    >
      <div
        style={{
          filter: blured ? "blur(5px) brightness(50%)" : "none",
          transition: "filter 200ms ease-in-out",
          width: "100%",
          height: "100%",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function Text({ blured, children, onClick, gl, error }) {
  const [hover, setHover] = useState(false);

  const text = [
    "⏻︎", //
    "Click to play",
    "(Shift + Click to pause)",
  ];

  if (!gl) {
    text[0] = "😞";
    text[1] = "This live demo uses WebGL";
    text[2] = "Your browser does not support WebGL.";
  }

  if (error) {
    text[0] = "😓";
    text[1] = "Oops! Something went wrong.";
    text[2] = "Report this error.";
  }

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "300px",
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
          pointerEvents: gl && !error ? "none" : "all",
        }}
      >
        <h2
          style={{
            transform: hover && gl && !error ? "scale(1.3)" : "scale(1.0)",
            transition: "transform 200ms ease-in-out",
          }}
        >
          {text[0]}
        </h2>
        <h4>{text[1]}</h4>
        <p>
          {error ? (
            <a style={{ zIndex: 50 }} href="mailto:farazzshaikh@gmail.com">
              {text[2]}
            </a>
          ) : (
            text[2]
          )}
        </p>
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
  const [error, setError] = useState(undefined);

  const gl = webgl_support();

  useEffect(async () => {
    if (gl && !error) {
      if (firstRender.current) {
        const canvas = ref.current;
        let _callback;
        try {
          _callback = await script(canvas);
        } catch (error) {
          console.error(error);
          setError(error);
          return;
        }

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
    }

    return () => {
      if (data.obeserever) data.obeserever.disconnect();
    };
  }, [blured]);

  function onClick(e) {
    if (gl && !error) setBlured(e.shiftKey);
  }

  return (
    <Text blured={blured} onClick={onClick} gl={gl} error={error}>
      <Blur blured={blured} gl={gl} error={error}>
        <canvas
          style={{
            zIndex: "10",
            ...style,
            height: "100%",
          }}
          ref={gl ? ref : null}
        />
      </Blur>
    </Text>
  );
}
