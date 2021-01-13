const graphql = require("graphql");

const {GraphQLObjectType, GraphQLString, GraphQLSchema} = graphql;

const movies = [
    {id: "1", name: "test-1", genre: "genre-1"},
    {id: "2", name: "test-2", genre: "genre-2"},
    {id: "3", name: "test-3", genre: "genre-3"},
    {id: "4", name: "test-4", genre: "genre-4"}
];

const MovieType = new GraphQLObjectType({
    name: "Movie",
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
    }),

});

const Query = new GraphQLObjectType({
    name: "Query",
    fields: () => ({
        movie: {
            type: MovieType,
            args: {id: {type: GraphQLString}},
            resolve(parent, args) {
                return movies.find(movie => movie.id === args.id)
            }
        },
    }),
})

module.exports = new GraphQLSchema({
    query: Query,
})