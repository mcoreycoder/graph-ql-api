const { GraphQLServer } = require('graphql-yoga')

const sampleDogs = [
    {breed: 'Apple', id: '1'},
    {breed: 'Banana', id: '2'},
    {breed: 'Orange', id: '3'},
    {breed: 'Melon', id: '4'},
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
        addDog(breed: String!, age: Int!): Dog
    }
  `
  
  const resolvers = {
    Query: {
      dogs: () => sampleDogs,
    },
    Mutation: {
        addDog: (parent, args, context, info )=> {
            console.log(args)
            return {...args, id: '5'}
        }
    }
  }
  
  const options = { port: 4000 }
  const server = new GraphQLServer({ typeDefs, resolvers })
  server.start(options, () => console.log('Server is running on localhost:' + options.port))