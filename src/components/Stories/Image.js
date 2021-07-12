import * as React from "react";
import Img from "gatsby-image";

export const Image = ({ post, style }) => {
  return <>{post.frontmatter.featuredImage.extension === "gif" ? <img src={post.frontmatter.featuredImage.publicURL} style={{ ...style }} /> : <Img style={{ ...style }} fluid={post.frontmatter.featuredImage.childImageSharp.fluid} />}</>;
};
