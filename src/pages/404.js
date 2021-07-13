import * as React from "react";
import { Default } from "../layouts/default";

// markup
const NotFoundPage = () => {
  return (
    <Default is404={true} title="Not Found" description="I haven't written about this yet!">
      <div style={{ height: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
        <h1 className="title is-1 _404 is-italic is-above-canvas">404</h1>
        <h4 className="subtitle is-3 mt-1 _404 is-above-canvas">I haven't written about this yet!</h4>
        <span className="is-above-canvas">
          If you think i should, let me know{" "}
          <a href="https://mail.google.com/mail/u/0/?fs=1&to=farazzshaikh@gmail.com&su=About...&body=Hey%20Faraz,%20....&tf=cm" target="_blank" rel="noreferrer">
            through email.
          </a>
        </span>
      </div>
    </Default>
  );
};

export default NotFoundPage;
