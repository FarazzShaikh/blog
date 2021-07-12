import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArtstation, faBitcoin, faEthereum, faGithub, faInstagram, faLinkedin, faMedium, faPaypal, faReddit } from "@fortawesome/free-brands-svg-icons";
import { faEnvelopeOpen, faIdCard } from "@fortawesome/free-solid-svg-icons";

export const Footer = () => {
  return (
    <footer className="footer has-nice-link no-print" style={{ zIndex: 1, backgroundColor: "transparent" }}>
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <h4 className="title is-6 mb-0">Support me</h4>
        <div className="column has-nice-link">
          <a className="icons" href="https://www.paypal.com/paypalme/farazzshaikh" target="_blank" rel="noreferrer">
            <FontAwesomeIcon className="icon" icon={faPaypal} />
          </a>
          <a href="https://farazzshaikh.github.io/glNoise/examples/support.html?via=ETH" target="_blank" rel="noreferrer" className="icons">
            <FontAwesomeIcon className="icon" icon={faEthereum} />
          </a>
          <a href="https://farazzshaikh.github.io/glNoise/examples/support.html?via=BTC" target="_blank" rel="noreferrer" className="icons">
            <FontAwesomeIcon className="icon" icon={faBitcoin} />
          </a>
        </div>
        <h4 className="title is-6 mb-0">Follow me</h4>
        <div className="column">
          <a className="icons" target="_blank" href="https://github.com/FarazzShaikh" rel="noreferrer">
            <FontAwesomeIcon className="icon" icon={faGithub} />
          </a>
          <a className="icons" target="_blank" href="https://www.linkedin.com/in/faraz-shaikh-811655166/" rel="noreferrer">
            <FontAwesomeIcon className="icon" icon={faLinkedin} />
          </a>
          <a className="icons" target="_blank" href="https://www.instagram.com/faar.az" rel="noreferrer">
            <FontAwesomeIcon className="icon" icon={faInstagram} />
          </a>
          <a className="icons" target="_blank" href="https://www.artstation.com/farazshaikh" rel="noreferrer">
            <FontAwesomeIcon className="icon" icon={faArtstation} />
          </a>
          <a className="icons" target="_blank" href="https://farazzshaikh.medium.com/" rel="noreferrer">
            <FontAwesomeIcon className="icon" icon={faMedium} />
          </a>
          <a className="icons" target="_blank" href="https://www.reddit.com/user/ppictures" rel="noreferrer">
            <FontAwesomeIcon className="icon" icon={faReddit} />
          </a>
        </div>
        <h4 className="title is-6 mb-0">Hire me</h4>
        <div className="column">
          <a className="icons" href="https://mail.google.com/mail/u/0/?fs=1&to=farazzshaikh@gmail.com&su=About...&body=Hey%20Faraz,%20....&tf=cm" target="_blank" rel="noreferrer">
            <FontAwesomeIcon className="icon" icon={faEnvelopeOpen} />
          </a>
          <a className="icons" href="https://farazshaikh.com/" target="_blank" rel="noreferrer">
            <FontAwesomeIcon className="icon" icon={faIdCard} />
          </a>
        </div>
      </div>

      <div style={{ flex: 1, textAlign: "center" }}>
        <p className="title is-6">
          <strong>
            Made with <span className="no-dark-mode">❤️</span>
          </strong>{" "}
          by <b>Faraz Shaikh</b>.
        </p>

        <p>
          <a href="https://github.com/FarazzShaikh/home" target="_blank" rel="noreferrer">
            Source Code
          </a>
          &ensp;•&ensp;
          <a href="{% link pages/privacy-policy.md %}" target="_blank">
            Privacy Policy
          </a>
        </p>

        <br />

        <p>
          The source code is licensed <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The website content is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
        </p>
      </div>
    </footer>
  );
};
