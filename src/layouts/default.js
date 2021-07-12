import * as React from "react";
import { Footer } from "../components/Footer";
import { Head } from "../components/Head";
import { Canvas } from "../components/Canvas/Canvas";
import { Navbar } from "../components/Navbar";

export const Default = ({ is404, children, title, style, description, lang, meta, image, pathname, keywords }) => {
  return (
    <main>
      <Head title={title} description={description} lang={lang} meta={meta} image={image} pathname={pathname} keywords={keywords} />
      <Navbar />

      <div style={{ position: "relative", backgroundColor: "transparent" }}>
        <Canvas is404={is404} />
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
