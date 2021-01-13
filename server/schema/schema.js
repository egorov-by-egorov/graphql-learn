const graphql = require("graphql");

const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt} = graphql;

const movies = [
    {id: "1", name: "movies_test-1", genre: "movies-1", directorsId: 4},
    {id: "2", name: "movies_test-2", genre: "movies-2", directorsId: 3},
    {id: "3", name: "movies_test-3", genre: "movies-3", directorsId: 2},
    {id: "4", name: "movies_test-4", genre: "movies-4", directorsId: 1}
];

const directors = [
    {id: "1", name: "directors_test-1", age: 15},
    {id: "2", name: "directors_test-2", age: 25},
    {id: "3", name: "directors_test-3", age: 35},
    {id: "4", name: "directors_test-4", age: 45}
];

const MovieType = new GraphQLObjectType({
    name: "Movie",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        director: {
            type: DirectorsType,
            resolve(parent, args) {
                return directors.find(director => director.id === parent.id)
            }
        },
    }),

});

const DirectorsType = new GraphQLObjectType({
    name: "Director",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
    }),

});

const Query = new GraphQLObjectType({
    name: "Query",
    fields: () => ({
        movie: {
            type: MovieType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return movies.find(movie => movie.id === args.id)
            }
        },
        director: {
            type: DirectorsType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return directors.find(director => director.id === args.id)
            }
        },
    }),
})

module.exports = new GraphQLSchema({
    query: Query,
})