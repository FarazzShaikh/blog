import * as React from "react";
import { Default } from "../layouts/default";

// markup
const NotFoundPage = () => {
  return (
    <Default title="Thank You!" description="Thank you for subscribing to be Newsletter." glyph="😞">
      <div style={{ height: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
        <h1 className="title is-1 _404 is-italic is-above-canvas">Thank You!</h1>
        <h4 className="subtitle is-3 mt-1 _404 is-above-canvas">Your subscription to my newsletter has been confirmed.</h4>
        <span className="is-above-canvas">
          Mistake?{" "}
          <a href="https://gmail.us6.list-manage.com/unsubscribe?u=941c6e913c28ab0bce1d95e07&id=3fc16b2455" target="_blank" rel="noreferrer">
            Unsubscribe here.
          </a>
        </span>
      </div>
    </Default>
  );
};

export default NotFoundPage;
