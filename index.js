const cors = require('micro-cors')();
const micro = require('micro');
const { ApolloServer, gql } = require('apollo-server-micro')
const {schema, schemaRoot} = require('./src/schema');

const server = new ApolloServer({
  schema:schema,
  rootValue:schemaRoot,
  introspection: true,
  playground: true, //Allow anyone to query
});

const optionsHandler = (req, res) => {
  if (req.method === 'OPTIONS') {
    res.end();
    return;
  }
  return server.createHandler({ path: '/api' })(req, res);
};

module.exports = cors(optionsHandler);
