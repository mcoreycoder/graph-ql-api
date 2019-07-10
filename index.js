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
      id: ID
      age: Int!
    }
    
    type Mutation {
        addDog(breed: String!, age: Int!): Dog
        deleteDog(id: String): Dog
        updateDog(breed: String!, age: Int!, id: ID): Dog

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
            // console.log('args', { ...args, id: sampleDogs.length + 1 })
            // console.log('args2', args.breed)
            // console.log('sampleDogs Mutation', sampleDogs)

            let dogTag = () => {
                let endDog = sampleDogs[sampleDogs.length - 1]
                console.log('endDog', endDog)
                if (endDog === undefined) return 1
                else
                    return endDog.id + 1
            }

            let newDog = await { ...args, id: dogTag() }
            // let newDog = await { ...args, id: endDog.id + 1 }
            sampleDogs = await [...sampleDogs, newDog]

            return newDog
        },
        deleteDog: async (parent, args, context, info) => {
            const dogToDelete = await sampleDogs.find(x => x.id == args.id);
            console.log("dogToDelete", dogToDelete)

            sampleDogs = await sampleDogs.filter(dog => dog.id !== dogToDelete.id);
            return dogToDelete;
        },
        updateDog: async (parent, args, context, info) => {
            console.log("updateDog args", args)
            const dogIndex = await sampleDogs.findIndex(dog => dog.id == args.id);
            console.log("dogToUpdate", dogIndex)
            // const dogUpdated = args;
            // console.log("dogUpdated", dogUpdated)

            sampleDogs = await sampleDogs.splice(dogIndex, 1, args);
            // console.log('newDogs', newDogs)
            return args;
        },


    }
}

const options = { port: 4000 }
const server = new GraphQLServer({ typeDefs, resolvers })
server.start(options, () => console.log('Server is running on localhost:' + options.port))