if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({
    path: `.env`,
  });
}

const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = {
  developMiddleware: app => {
    app.use(
      "/.netlify/functions/",
      createProxyMiddleware({
        target: "http://localhost:9000",
        pathRewrite: {
          "/.netlify/functions/": "",
        },
      })
    )
  },
  siteMetadata: {
    title: `Carleton Volleyball`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        // Add any options here
      },
    },
    {
      resolve: 'gatsby-plugin-express',
      options: {
        output: 'config/gatsby-express.json',
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-mongodb`,
      options: {
        connectionString: "mongodb+srv://admin:CUvb54321@cluster0.l96zo.mongodb.net",
        dbName: 'database',
        collection: 'events',
        server: {
          address: "cluster0-shard-00-01.l96zo.mongodb.net",
          port: 27017,
        },
        auth: {
          user: 'admin',
          password: 'CUvb54321'
        },
        extraParams: {
          replicaSet: 'cluster0',
          ssl: true,
          authSource: 'admin',
          retryWrites: true,
          w: "majority"
        },
        map: {
          events: { details: `text/markdown` }
        }
      },
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        includePaths: ["./src"]
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
