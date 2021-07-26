import React from "react";

export function Newsletter() {
  return (
    <div style={{ flex: 1, textAlign: "left" }}>
      <br />

      <h3 style={{ fontStyle: "italic" }} className="title">
        Anything I create, to you first!
      </h3>
      <p style={{ color: "#4a4a4a" }} className="sub-title">
        A newsletter about WebGL, Computer-Graphics and programming. I'll share anything intresting I read, write or create.
      </p>

      <br />

      <form>
        <div className="columns">
          <div className="field column">
            <label className="label">Name</label>
            <div className="control">
              <input className="input" type="text" placeholder="Faraz" />
            </div>
          </div>

          <div className="field column">
            <h4 className="label">Email</h4>
            <div className="control">
              <input className="input" type="email" placeholder="farazzshaikh@gmail.com" />
            </div>
          </div>
        </div>

        <div className="field">
          <p className="control">
            <a className="button is-black is-fullwidth">Subscribe</a>
          </p>
        </div>
      </form>

      <br />
    </div>
  );
}
