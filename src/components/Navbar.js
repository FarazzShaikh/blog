import { Link, StaticQuery, graphql } from "gatsby";
import * as React from "react";

export const Navbar = ({ isRoot }) => {
  return (
    <StaticQuery
      query={graphql`
        query {
          allMdx(limit: 1, sort: { order: DESC, fields: [frontmatter___date] }) {
            edges {
              node {
                id
                excerpt(pruneLength: 260)
                frontmatter {
                  date(formatString: "MMMM DD, YYYY")
                  slug
                  title
                  subtitle
                  summary
                  featuredImage {
                    childImageSharp {
                      fluid(maxWidth: 800) {
                        ...GatsbyImageSharpFluid
                      }
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
          }
        }
      `}
      render={({ allMdx: { edges } }) => {
        const { slug } = edges[0].node.frontmatter;

        return (
          <div className="hero-head no-print">
            <div className="container" style={{ position: "relative" }}>
              <nav className="navbar has-shadow pt-2 pb-2 pl-4 pr-4" role="navigation" aria-label="main navigation" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <a id="unicorn-btn" className="navbar-item" target="_blank" href="https://farazshaikh.com" title="Who am I?" style={{ color: "black" }} rel="noreferrer">
                  Faraz Shaikh
                </a>
                <div></div>
                <div className="is-fixed-top">
                  <div className="navbar-end" style={{ display: "flex" }}>
                    <Link className="navbar-item is-tab" style={{ color: "black" }} to="/">
                      Stories
                    </Link>
                    <Link className="navbar-item is-tab" style={{ color: "black" }} to={slug}>
                      Latest
                    </Link>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        );
      }}
    />
  );
};
