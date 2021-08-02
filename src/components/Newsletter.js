import React, { useState } from "react";

const errorMap = {
  "Member Exists": "This email is already subscribed.",
  "Invalid Resource": "This email looks fake or invalid, please enter a real email.",
  "Rate Limit": "The API's rate limit is reached. Try again later.",
  generic: "Oops! Something went wrong. Try again later.",
};

function Form({ onSubmit, setEmail, setName, loading, error }) {
  return (
    <form onSubmit={onSubmit}>
      <div className="columns">
        <div className="field column">
          <label className="label">Name</label>
          <div className="control">
            <input required className="input" type="text" placeholder="Faraz" onChange={({ target: { value } }) => setName(value)} />
          </div>
        </div>

        <div className="field column">
          <h4 className="label">Email</h4>
          <div className="control">
            <input required className="input" type="email" placeholder="farazzshaikh@gmail.com" onChange={({ target: { value } }) => setEmail(value)} />
          </div>
          <p className="help is-danger">{errorMap[error] || ""}</p>
        </div>
      </div>

      <div className="field">
        <p className="control">
          <button disabled={loading} type="submit" className="button is-black is-fullwidth">
            Subscribe
          </button>
        </p>
      </div>
    </form>
  );
}

function Success() {
  return (
    <div>
      <h3 style={{ fontStyle: "italic" }} className="title">
        Done!
      </h3>
      <p style={{ color: "#4a4a4a" }} className="sub-title">
        Please confirm your subscription by checking your email. I need to know if you're a human.
      </p>
    </div>
  );
}

export function Newsletter() {
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("email", email);
    formData.append("name", name);

    const response = await fetch("https://api.farazshaikh.com/subscribe", {
      method: "POST",
      body: formData,
    });

    const body = JSON.parse(await response.text());

    if (response.status !== 200) {
      if (response.status === 429) {
        setError("Rate Limit");
      } else {
        setError(body.title);
      }
    } else {
      setSuccess(true);
    }

    setLoading(false);
  }

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

      {success ? <Success /> : <Form onSubmit={onSubmit} loading={loading} setName={setName} setEmail={setEmail} error={error} />}

      <br />
    </div>
  );
}
