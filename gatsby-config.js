module.exports = {
  siteMetadata: {
    siteUrl: "https://blog.farazshaikh.com",
    title: "Faraz Shaikh's blog",
    discription: "Personal Blog Site of Faraz Shaikh",
    author: "Faraz Shaikh",
    keywords: ["blog", "faraz", "shaikh", "writing", "tech", "programming", "computers", "graphics", "react", "gatsby"],
  },
  flags: {
    DEV_SSR: false,
  },
  //   pathPrefix: "/blog",
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    "gatsby-transformer-sharp",
    `gatsby-transformer-remark`,
    "gatsby-plugin-sass",
    `gatsby-remark-images`,
    "gatsby-plugin-sharp",
    {
      resolve: `gatsby-plugin-goatcounter`,
      options: {
        code: "blog-farazshaikh",
        head: true,
      },
    },

    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `./src/posts/`,
      },
      __key: "posts",
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `./src/images/`,
      },
      __key: "images",
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [`gatsby-remark-reading-time`],
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          "gatsby-remark-code-titles",
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {
                sh: "bash",
                js: "javascript",
              },
              showLineNumbers: false,
              noInlineHighlight: true,
            },
          },
          {
            resolve: `gatsby-remark-copy-linked-files`,
            options: {
              ignoreFileExtensions: [`png`, `jpg`, `jpeg`, `bmp`, `tiff`],
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
            },
          },
        ],
      },
    },
  ],
};
