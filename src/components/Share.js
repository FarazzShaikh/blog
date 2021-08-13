import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LinkedinShareButton, TwitterShareButton, RedditShareButton } from "react-share";
import { faLinkedinIn, faRedditAlien, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faLink, faShareAlt } from "@fortawesome/free-solid-svg-icons";

const Share = ({ socialConfig, tags }) => (
  <div className="post-social">
    <TwitterShareButton url={socialConfig.config.url} className="button is-outlined is-rounded twitter" title={socialConfig.config.title} via={socialConfig.twitterHandle.split("@").join("")} hashtags={tags}>
      <span className="icon">
        <FontAwesomeIcon icon={faTwitter} />
      </span>
    </TwitterShareButton>
    <LinkedinShareButton url={socialConfig.config.url} className="button is-outlined is-rounded linkedin" title={socialConfig.config.title}>
      <span className="icon">
        <FontAwesomeIcon icon={faLinkedinIn} />
      </span>
    </LinkedinShareButton>
    <RedditShareButton url={socialConfig.config.url} className="button is-outlined is-rounded reddit" title={socialConfig.config.title}>
      <span className="icon">
        <FontAwesomeIcon icon={faRedditAlien} />
      </span>
    </RedditShareButton>
    <div
      className="button is-outlined is-rounded copy-link"
      title="Copy Link"
      onClick={(event) => {
        navigator.clipboard.writeText(socialConfig.config.url);
      }}
    >
      <span className="icon">
        <FontAwesomeIcon icon={faLink} />
      </span>
    </div>
  </div>
);

Share.propTypes = {
  socialConfig: PropTypes.shape({
    twitterHandle: PropTypes.string.isRequired,
    config: PropTypes.shape({
      url: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),
  }).isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
};
Share.defaultProps = {
  tags: [],
};

export default Share;
