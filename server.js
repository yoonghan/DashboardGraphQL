`use strict`

var express = require('express');
var express_graphql = require('express-graphql');
var {schema, schemaRoot} = require('./schema');

const DOMAIN = "/rems";

var GraphQLApp = function(argPort, argCorsEnable) {
  var app = express();

  if(argCorsEnable === "T") {
    app.use(DOMAIN, function (req, res, next) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
      if (req.method === 'OPTIONS') {
        res.sendStatus(200);
      } else {
        next();
      }
    });
  }

  app.use(DOMAIN, express_graphql({
      schema: schema,
      rootValue: schemaRoot,
      graphiql: true //Set true to enable a GraphQL Ui.
  }));
  app.listen(argPort, () => console.log(`Express GraphQL Server Now Running On localhost:${argPort}${DOMAIN}`));
}

//Start the app.
if(process.argv.length > 3) {
  GraphQLApp(Number(process.argv[2]), process.argv[3]);
}
else {
  console.error("Specify the [port number] [enable cors]")
}
