const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    type: String,
    created: Date,
});
const User = mongoose.model("users", userSchema, "users");

export function handler(event, context, callback) {
    mongoose.connect("mongodb+srv://admin:CUvb54321@cluster0.l96zo.mongodb.net/database?retryWrites=true&w=majority", {useNewUrlParser: true}).then(() => {
        const { email, password } = JSON.parse(event.body);
        User.findOne({ email: email }, (err, res) => {
            if (res) {
                bcrypt.compare(password, res.password, (err, same) => {
                    if (same) {
                        callback(null, {
                            statusCode: 200,
                            body: JSON.stringify({id: res._id, type: res.type, name: res.name, email: res.email})
                        });
                    }
                });
            } else {
                callback(null, {
                    statusCode: 500,
                    body: JSON.stringify({err: 'no email match'})
                });
            }
        });
    }).catch((err) => {
        callback(null, {
            statusCode: 200,
            body: JSON.stringify({msg: err})
        });
    });
}