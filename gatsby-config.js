module.exports = {
  siteMetadata: {
    title: "calculator",
    siteUrl: "https://rafsaf.github.io"
  },
  pathPrefix: "/calculator/",
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-offline",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
  ],
};
