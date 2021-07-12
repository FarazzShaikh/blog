import * as React from "react";
import { Link } from "gatsby";
import { Canvas } from "../components/Canvas/Canvas";
import { Default } from "../layouts/default";

// markup
const NotFoundPage = () => {
  return (
    <Default is404={true} title="Not Found" description="I have'nt written about this yet!">
      <div style={{ zIndex: 1, height: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <h1 className="title is-1 _404 is-italic">404</h1>
        <h4 className="subtitle is-3 mt-1 _404">I have'nt written about this yet!</h4>
        <span>
          If you think i should, let me know <a href="https://mail.google.com/mail/u/0/?fs=1&to=farazzshaikh@gmail.com&su=About...&body=Hey%20Faraz,%20....&tf=cm">through email.</a>
        </span>
      </div>
    </Default>
  );
};

export default NotFoundPage;
