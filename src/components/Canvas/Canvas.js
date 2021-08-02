import React, { useState } from "react";
import { main } from "./scripts/main";
import { useAlert } from "react-alert";
import { positions, Provider } from "react-alert";

import { CanvasProvider } from "./CanvasProvider";
// import AlertTemplate from "react-alert-template-basic";

function webgl_support() {
  try {
    var canvas = document.createElement("canvas");
    return !!window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
  } catch (e) {
    return false;
  }
}

const AlertTemplate = ({ style, options, message, close }) => {
  let color;

  switch (options.type) {
    case "info":
      color = "#BEAEE2";
      break;
    case "success":
      color = "#C9E4C5";
      break;
    case "error":
      color = "#F38BA0";
      break;
  }

  return (
    <div
      style={{
        backgroundColor: color,
        width: "100%",
        padding: "0.5em",
        margin: "0.5em",
        borderRadius: "5px",
        color: "white",
        boxShadow: "0px 1px 3px rgba(0,0,0,0.3)",
        textAlign: "center",
        ...style,
      }}
    >
      {message}
    </div>
  );
};

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  containerStyle: {
    zIndex: 100,
  },
};

function AlertBox({ gl, error, children }) {
  const alert = useAlert();

  if (!gl) {
    alert.error("😞 Looks like your browser does not support WebGL.");
    alert.info("Use a browser that does for a better experience.");
  }

  if (error) {
    alert.error("😓 Oops! Something went wrong. Click to report.");
  }

  return <>{children}</>;
}

export const Canvas = ({ is404, isReader }) => {
  const gl = webgl_support();
  const [error, setError] = useState(false);

  return (
    <>
      <div
        className="_3d"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 0,
          width: "100vw",
          height: "100%",
        }}
      >
        <Provider template={AlertTemplate} {...options}>
          <div
            style={{
              position: "sticky",
              top: 0,
            }}
          >
            <AlertBox gl={gl} error={error} />
            {gl && !isReader && !error ? <CanvasProvider is404={is404} script={main} setError={setError} /> : <></>}
          </div>
        </Provider>
      </div>
    </>
  );
};
