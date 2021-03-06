import * as React from "react";
import { GatsbyImage } from "gatsby-plugin-image";

export const Image = ({ post, style }) => {
  if (post.frontmatter && post.frontmatter.featuredImage) {
    return <>{post.frontmatter.featuredImage.extension === "gif" ? <img src={post.frontmatter.featuredImage.publicURL} alt="gif" style={{ ...style }} /> : <GatsbyImage style={{ ...style }} image={post.frontmatter.featuredImage.childImageSharp.gatsbyImageData} alt="image" />}</>;
  }

  return <></>;
};
