import React from "react";

export function Image({ src, caption, source }) {
  return (
    <div align="center">
      <Image
        src={src} //
        style={{
          height: "300px",
        }}
      />

      <div>
        <a href={source} style={{ fontStyle: "italic" }}>
          {caption}
        </a>
      </div>
    </div>
  );
}
