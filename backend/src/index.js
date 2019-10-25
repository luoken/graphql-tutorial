const { GraphQLServer} = require('graphql-yoga');

// // 1
// const typeDefs = `
//   type Query {
//     info: String!
//     feed: [Link!]!
//   }

//   type Mutation {
//     post(url: String!, description: String!): Link!
//   }

//   type Link {
//     id: ID!
//     description: String!
//     url: String!
//   }
  
// `
let links = [{
  id: 'link-0',
  url: 'www.google.com',
  description: 'google.com page'
}]

// 2
let idCount = links.length
const resolvers = {
  Query: {
    info: () => `This is the api of yelp clone`,
    feed: () => links,
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }
      links.push(link)
      return link
    }
  },
}

// 3
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
})


server.start(() => console.log(`Server is running on http://localhost:4000`))
