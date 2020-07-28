if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({
    path: `.env`,
  });
}

module.exports = {
  siteMetadata: {
    title: `Carleton Volleyball Club`,
    description: `Homepage of the Carleton Volleyball Club`,
    author: `Tom Zhu`,
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
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-mongodb`,
      options: {
        connectionString: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_URL}`,
        dbName: process.env.DB_NAME,
        collection: 'events',
        server: {
          address: process.env.DB_ADDRESS,
          port: 27017,
        },
        auth: {
          user: process.env.DB_USER,
          password: process.env.DB_PASS
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
    `gatsby-plugin-remove-trailing-slashes`,
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
  proxy: {
    prefix: '/api',
    url: 'http://localhost:3000',
  }
}
