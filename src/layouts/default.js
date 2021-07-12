import React, { useState } from "react";
import { Footer } from "../components/Footer";
import { Head } from "../components/Head";
import { Canvas } from "../components/Canvas/Canvas";
import { Navbar } from "../components/Navbar";

import { fps } from "../components/Canvas/scripts/fps";

export const Default = ({ is404, children, title, style, description, lang, meta, image, pathname, keywords }) => {
  const [isReader, setIsReader] = useState(false);

  const interval = setInterval(() => {
    const s = document.querySelector(".warning-container");
    if (fps.value <= 30) {
      if (s && s.style.display !== "block") s.style.display = "block";
    } else {
      if (s && s.style.display !== "none") s.style.display = "none";
    }
  }, 1000);

  return (
    <main>
      <Head title={title} description={description} lang={lang} meta={meta} image={image} pathname={pathname} keywords={keywords} />
      <Navbar />
      <div className="warning-container">
        Having trouble running this page?&nbsp;
        <span
          style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
          onClick={() => {
            setIsReader(true);
            clearInterval(interval);
            document.querySelector(".warning-container").remove();
          }}
        >
          Switch to reader view.
        </span>
      </div>

      <div style={{ position: "relative", backgroundColor: "transparent" }}>
        <Canvas isReader={isReader} is404={is404} />
        <br />
        <br />
        <div lang="en" className="main-container" style={style}>
          {children}
        </div>
        <br />
      </div>

      <Footer />
    </main>
  );
};
