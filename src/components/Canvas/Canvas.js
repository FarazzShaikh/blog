import React from "react";
import { main } from "./scripts/main";
import { useAlert } from "react-alert";
import { positions, Provider } from "react-alert";

import { CanvasProvider } from "./CanvasProvider";
import AlertTemplate from "react-alert-template-basic";

function webgl_support() {
  try {
    var canvas = document.createElement("canvas");
    return !!window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
  } catch (e) {
    return false;
  }
}

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  containerStyle: {
    zIndex: 100,
  },
};

function AlertBox({ gl, children }) {
  const alert = useAlert();

  if (!gl) {
    alert.error("Looks like your browser does not support WebGL.");
    alert.info("Use a browser that does for a better experience.");
  }

  return <>{children}</>;
}

export const Canvas = ({ is404, isReader }) => {
  const gl = webgl_support();

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
            <AlertBox gl={gl} />
            {gl && !isReader ? <CanvasProvider is404={is404} script={main} /> : <></>}
          </div>
        </Provider>
      </div>
    </>
  );
};
