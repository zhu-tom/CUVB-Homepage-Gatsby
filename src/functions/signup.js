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

export function handler(event, context, callback) {
    const { name, email, password } = JSON.parse(event.body);

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
                            callback(null, {
                                statusCode: 200,
                                body: JSON.stringify(user)
                            });
                        });
                    });
                }
            }); 
        }).catch((err) => {
            callback(null, {
                statusCode: 500,
                body: JSON.stringify({error: err})
            });
        });
    }
}