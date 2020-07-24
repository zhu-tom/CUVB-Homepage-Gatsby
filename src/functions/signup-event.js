const mongoose = require('mongoose');
const eventSchema = new mongoose.Schema({
    attendees: [mongoose.ObjectId],
    details: String,
    date: {day: Date, start: String, end: String},
});
const Event = mongoose.model("events", eventSchema, "events");

export function handler(event, context, handler) {
    const { id, markdown, date } = JSON.parse(event.body);

    if (id) {
        mongoose.connect(`mongodb+srv://${process.env.GATSBY_DB_USER}:${process.env.GATSBY_DB_PASS}@${process.env.GATSBY_DB_URL}/${process.env.GATSBY_DB_NAME}?retryWrites=true&w=majority`, {useNewUrlParser: true}).then(() => {
           new Event({
            attendees: [],
            details: markdown,
            date: date,
           });
        });
    }
}