import React, { useEffect, useState } from "react";
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
  const [isMobile, setIsMobile] = useState(false);
  const Posts = edges.map((edge, i) => <PostLink key={edge.node.id} index={i} post={edge.node} />);

  let left;
  let right;

  if (!isMobile) {
    left = Posts.filter((_, i) => i % 2 === 0);
    right = Posts.filter((_, i) => i % 2 !== 0);
  } else {
    const half = Math.ceil(Posts.length / 2);
    left = Posts.slice(0, half);
    right = Posts.slice(-half);
  }

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024);
  }, [isMobile]);

  return (
    <Default is404={false} title="" description="A list of all my posts. Stuff I find cool, intresting, or both." pathname={location.pathname}>
      <div id="stories" className="columns is-mobile">
        <div className="column is-above-canvas">
          <div>
            <h1 className="title is-2">Stories</h1>
            <h4 className="subtitle is-4 mt-1">Sometimes I write about things I find cool, intresting, or both.</h4>
          </div>
          {left}
        </div>

        <div className="column is-above-canvas">{right}</div>
      </div>

      <div className="has-text-centered is-6 is-above-canvas">More coming soon...</div>
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
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            slug
            title
            subtitle
            summary
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
    }
  }
`;
