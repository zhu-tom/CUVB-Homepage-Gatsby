const {MongoClient} = require('mongodb');

export function handler(event, handler, callback) {
    const uri = `mongodb+srv://${process.env.GATSBY_DB_USER}:${process.env.GATSBY_DB_PASS}@${process.env.GATSBY_DB_URL}/${process.env.GATSBY_DB_NAME}?retryWrites=true&w=majority`;
    const client = new MongoClient(uri, {useNewUrlParser: true});
    callback(null, {
        statusCode: 200,
        body: JSON.stringify({msg: "connected"})
    });
    // client.connect().then(() => {
    //     callback(null, {
    //         statusCode: 200,
    //         body: JSON.stringify({msg: "connected"})
    //     })
    //     const db = client.db("database");
    //     const users = db.collection("users");

    //     users.findOne({email: 'admin'}).then((res) => {
    //         callback(null, {
    //             statusCode: 200,
    //             body: JSON.stringify(res)
    //         });
    //     });
    // });
}