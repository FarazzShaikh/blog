import * as React from "react";
import { Default } from "../layouts/default";

const Privacy = () => {
  const date = new Date().toString().match(/\w{3} \w{3} \d{1,2} \d{4}/);

  return (
    <Default is404={false} title="Privacy Policy" description="Privacy policy of Faraz Shaikh's blog.">
      <div style={{ height: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
        <div className="subtitle is-6">{date}</div>
        <h1 className="title is-2">Privacy Policy</h1>
        <p>
          I use a GDPR complient web analytics tool called <a href="https://www.goatcounter.com/">GoatCounter</a> to see how this site is doing. No personally identifiable information is collected, thus, it doesn't need annoying GDPR or cookie notices. You can see GoatCounter's privacy policy{" "}
          <a href="https://www.goatcounter.com/privacy">here</a>.
          <br />
          <br />
          Some might say analytics on personal sites are simply <i>"vanity metrics"</i> but it is important for me know how well this site does to allocate the time I spend maintaining it efficiently.
          <br />
          <br />
          Thank you for understanding.
        </p>
      </div>
    </Default>
  );
};

export default Privacy;
