const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Speaker = require('./speaker');

const meetupSchema = new Schema({
    name: String,
    date: String,
    venue: String,
    speakerId: String
});

module.exports = mongoose.model('Meetup',meetupSchema);
