import * as React from "react";
import "../styles/main.scss";
import { graphql } from "gatsby";
import { Default } from "../layouts/default";
import { PostLink } from "../components/Stories/PostLink";

// markup
const Index = ({
  data: {
    allMdx: { edges },
  },
  location,
}) => {
  const Posts = edges.map((edge, i) => <PostLink key={edge.node.id} index={i} post={edge.node} />);

  const left = Posts.filter((_, i) => i % 2 === 0);
  const right = Posts.filter((_, i) => i % 2 !== 0);

  return (
    <Default is404={false} title="" description="A list of all my posts. Stuff I find cool, intresting, or both." pathname={location.pathname}>
      <div id="stories" className="columns is-mobile">
        <div className="column" style={{ zIndex: 1, backgroundColor: "transparent" }}>
          <div>
            <h1 className="title is-2">Stories</h1>
            <h4 className="subtitle is-4 mt-1">Sometimes I write about things I find cool, intresting, or both.</h4>
          </div>
          {left}
        </div>

        <div className="column" style={{ zIndex: 1, backgroundColor: "transparent" }}>
          {right}
        </div>
      </div>

      <div className="has-text-centered is-6" style={{ zIndex: 1, backgroundColor: "transparent" }}>
        More coming soon...
      </div>
    </Default>
  );
};

export default Index;

export const pageQuery = graphql`
  query {
    allMdx(sort: { order: DESC, fields: [frontmatter___date] }) {
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
`;
