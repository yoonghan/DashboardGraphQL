const { ApolloServer, gql } = require('apollo-server-micro')
const {schema, schemaRoot} = require('./src/schema');

const server = new ApolloServer({
  schema:schema,
  rootValue:schemaRoot,
  introspection: true,
  playground: true
});

module.exports = server.createHandler({ path: '/api' })

/*server.listen().then(({ url }) => {
  console.log("Server ready at " + url);
});*/
