const express = require('express');
const expressGraphql = require('express-graphql');
const schema = require('../schema/schema')

const app = express();
const PORT = 3005;

app.use('/graphql', expressGraphql.graphqlHTTP({
    schema,
    graphiql: true,
}));

app.listen(PORT, err => {
    err ? console.log(error) : console.log('server started!');
})