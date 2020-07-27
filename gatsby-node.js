/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require('path');

exports.onCreatePage = async ({ page, actions }) => {
    const { createPage } = actions
  
    // page.matchPath is a special key that's used for matching pages
    // only on the client.
    if (page.path.match(/^\/account/)) {
      page.matchPath = "/account/*"
  
      // Update the page.
      createPage(page)
    }
    if (page.path.match(/^\/admin/)) {
        page.matchPath = "/admin/*"

        createPage(page);
    }
  }

exports.onCreateNode = ({ node }) => {
    // console.log(node.internal.type);
}

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;

    const result = await graphql(`
        query {
            allMongodbDatabaseEvents {
                edges {
                    node {
                        mongodb_id
                        details {
                            childMarkdownRemark {
                                html
                                id
                            }
                        }
                    }
                }
            }
        }
    `);

    result.data.allMongodbDatabaseEvents.edges.forEach(({ node }) => {
        console.log(node);
        createPage({
            path: `/events/${node.mongodb_id}`,
            component: path.resolve(`./src/templates/event-post.js`),
            context: {
                id: node.mongodb_id,
            }
        });
    })
}