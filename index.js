const { GraphQLServer } = require('graphql-yoga')

let sampleDogs = [
    { breed: 'Apple', age: 1, id: 1 },
    { breed: 'Banana', age: 2, id: 2 },
    { breed: 'Orange', age: 3, id: 3 },
    { breed: 'Melon', age: 4, id: 4 }
]

const typeDefs = `
    type Query {
      dogs: [Dog!]!
    }
    type Dog {
      breed: String!
      id: String
      age: Int!
    }
    type Mutation {
        addDog(breed: String!, age: Int!, id: String): Dog
    }
  `

const resolvers = {
    Query: {
        dogs: () => {
            console.log('sampleDogs Query', sampleDogs)
            return sampleDogs
        },
    },
    Mutation: {
        addDog: async (parent, args, context, info) => {
            console.log('args', { ...args, id: sampleDogs.length+1 })
            console.log('args2', args.breed)
            console.log('sampleDogs Mutation', sampleDogs)

            let newDog = await { ...args, id: sampleDogs.length+1 }
            sampleDogs = await [...sampleDogs, newDog]

            return newDog
        }
    }
}

const options = { port: 4000 }
const server = new GraphQLServer({ typeDefs, resolvers })
server.start(options, () => console.log('Server is running on localhost:' + options.port))