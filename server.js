const express = require("express");
const gatsyExpress = require('gatsby-plugin-express');
const app = express();

const bcrypt = require("bcryptjs");
const salt_rounds = 10;
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    type: String,
    created: Date,
});
const User = mongoose.model("users", userSchema, "users");

const eventSchema = new mongoose.Schema({
    attendees: [mongoose.ObjectId],
    details: String,
    date: {day: Date, start: String, end: String},
});
const Event = mongoose.model("events", eventSchema, "events");

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// serve static files before gatsbyExpress
app.use(express.static('public/'));
// app.use(gatsyExpress('config/gatsby-express.json', {
//   publicDir: 'public/',
//   template: 'public/404/index.html',

//   // redirects all /path/ to /path
//   // should be used with gatsby-plugin-remove-trailing-slashes
//   redirectSlashes: true,
// }));

app.use(express.json());

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    console.log(`${process.env.GATSBY_DB_NAME}`);
    mongoose.connect(`mongodb+srv://${process.env.GATSBY_DB_USER}:${process.env.GATSBY_DB_PASS}@${process.env.GATSBY_DB_URL}/${process.env.GATSBY_DB_NAME}?retryWrites=true&w=majority`, {useNewUrlParser: true}).then((instance) => {
        User.findOne({ email: email }, (err, doc) => {
            if (doc) {
                bcrypt.compare(password, res.password, (err, same) => {
                    if (same) {
                        delete doc.password;
                        res.json(doc);
                    }
                });
            } else {
                res.json({err: 'no email match'});
            }
        });
    }).catch((err) => {
        res.json({err: err});
    });
});

app.post('/api/signup', (req, res) => {
    const { name, email, password } = JSON.parse(req.body);

    if (name && email && password) {
        mongoose.connect(`mongodb+srv://${process.env.GATSBY_DB_USER}:${process.env.GATSBY_DB_PASS}@${process.env.GATSBY_DB_URL}/${process.env.GATSBY_DB_NAME}?retryWrites=true&w=majority`, {useNewUrlParser: true}).then(() => {
            User.findOne({ email: email }).then(value => {
                if (!value) {
                    bcrypt.hash(password, salt_rounds, (err, hash) => {
                        new User({
                            name: name,
                            email: email,
                            password: hash,
                            type: "basic",
                            created: Date.now()
                        }).save().then((user) => {
                            user = user.toJSON();
                            delete user.password;
                            res.send(JSON.stringify(user));
                        });
                    });
                }
            }); 
        }).catch((err) => {
            res.send(JSON.stringify({err: err}));
        });
    }
});

app.post('/api/events/add', (req, res) => {

});

app.post('/api/events/signup', (req, res) => {
    const { id, markdown, date } = JSON.parse(req.body);

    if (id) {
        mongoose.connect(`mongodb+srv://${process.env.GATSBY_DB_USER}:${process.env.GATSBY_DB_PASS}@${process.env.GATSBY_DB_URL}/${process.env.GATSBY_DB_NAME}?retryWrites=true&w=majority`, {useNewUrlParser: true}).then(() => {
           new Event({
            attendees: [],
            details: markdown,
            date: date,
           });
        });
    }
});

app.get('/api/hello', (req, res) => {
    res.send(JSON.stringify({msg: "hello"}));
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`started listening on ${port}`));