import { Link } from "gatsby";
import * as React from "react";
import { Image } from "./Image";

export const PostLink = ({ post, index }) => {
  return (
    <div style={{ display: "flex", marginTop: "1em" }}>
      <Link className="box" to={post.frontmatter.slug}>
        <figure className="image">
          <Image post={post} />
        </figure>
        <div>
          <h1 className="title is-4">{post.frontmatter.title}</h1>
          <h2 className="subtitle is-5 is-italic ">{post.frontmatter.subtitle}</h2>
          <span className="tag">{post.frontmatter.date}</span>
          <span className="tag ml-1">{post.fields.readingTime.text}</span>
          {index === 0 ? (
            <span className="tag ml-1" style={{ backgroundColor: "limegreen", color: "black" }}>
              Latest
            </span>
          ) : (
            <></>
          )}
          <br />
          <br />
          <span>{post.frontmatter.summary}</span>
        </div>
      </Link>
    </div>
  );
};
