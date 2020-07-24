// For more info, check https://www.netlify.com/docs/functions/#javascript-lambda-functions
const {MongoClient} = require('mongodb');

export function handler(event, context, callback) {
    console.log("queryStringParameters", event.queryStringParameters);
    const uri = `mongodb+srv://${process.env.GATSBY_DB_USER}:${process.env.GATSBY_DB_PASS}@${process.env.GATSBY_DB_URL}/${process.env.GATSBY_DB_NAME}?retryWrites=true&w=majority`;
    callback(null, {
      // return null to show no errors
      statusCode: 200, // http status code
      body: JSON.stringify({
        msg: uri,
      }),
    });
  }