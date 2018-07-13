const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://pragya:test123@ds137661.mlab.com:37661/girls-who-javascript');
mongoose.connection.once('open', () => {
    console.log('Voila! Connected to database!');
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, ()=> {
    console.log('Hurray! Now listening to port 4000');
});