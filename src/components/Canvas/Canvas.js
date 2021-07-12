import React, { useEffect, useRef } from "react";
import { main } from "./scripts/main";

import { CanvasProvider } from "./CanvasProvider";

export const Canvas = ({ is404 }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 0,
        width: "100vw",
        height: "100%",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
        }}
      >
        <CanvasProvider is404={is404} script={main} />
      </div>
    </div>
  );
};
