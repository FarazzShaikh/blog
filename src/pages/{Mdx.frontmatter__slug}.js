import React from "react";
import { graphql } from "gatsby";
import { Default } from "../layouts/default";
import { Image } from "../components/Stories/Image";

import { MDXRenderer } from "gatsby-plugin-mdx";

import "../styles/markdown.scss";

export default function Template(props) {
  const { mdx } = props.data;
  const { frontmatter, body, fields } = mdx;

  const image = frontmatter.featuredImage ? frontmatter.featuredImage.childImageSharp.gatsbyImageData : null;

  return (
    <Default is404={false} title={frontmatter.title} description={frontmatter.summary} image={image} pathname={props.location.pathname} keywords={frontmatter.tags}>
      <div className="container">
        <div className="has-text-centered">
          <div className="subtitle is-6">
            {frontmatter.date} · {fields.readingTime.text}
          </div>
          <h1 className="title is-2">{frontmatter.title}</h1>
          <h2 className="subtitle is-4 is-italic ">{frontmatter.subtitle}</h2>

          <br />
          <Image post={mdx} />
          <br />
        </div>
        <div className="content">
          <MDXRenderer>{body}</MDXRenderer>
        </div>
      </div>
    </Default>
  );
}
export const pageQuery = graphql`
  query ($id: String!) {
    mdx(id: { eq: $id }) {
      body
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        subtitle
        summary
        tags
        featuredImage {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
          }
          extension
          publicURL
        }
      }
      fields {
        readingTime {
          text
        }
      }
    }
  }
`;
