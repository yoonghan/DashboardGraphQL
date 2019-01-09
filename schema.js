`use strict`

var {
  graphql,
  buildSchema,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} = require('graphql');
var {
  makeExecutableSchema,
  introspectSchema,
  mergeSchemas
} = require ('graphql-tools');
var Store = require('./stores');
var Agent = require('./agents');
var Region = require('./regions');
var Country = require('./country');

const linkTypeDefs = `
  extend type Country {
    regions: [Region]
  }
  extend type Region {
    stores: [Store]
  }
  extend type Store {
    agents: [Agent]
  }
`;

const schema = mergeSchemas({
  schemas: [Store.schema, Agent.schema, Region.schema, Country.schema, linkTypeDefs],
  resolvers: mergeInfo => ({
    Country: {
      regions: {
        fragment: `fragment CountryFragment on Fragment { id }`,
        resolve(parent, args, context, info) {
          const regionIds = parent.regionIds;
          return mergeInfo.delegateToSchema(
            {
              schema: Region.schema,
              operation: 'query',
              fieldName: 'regionsByIds',
              args: { ids: regionIds },
              context: context,
              info: info
            }
          );
        },
      },
    },
    Region: {
      stores: {
        fragment: `fragment RegionFragment on Fragment { id }`,
        resolve(parent, args, context, info) {
          const storeIds = parent.storeIds;
          return mergeInfo.delegateToSchema(
            {
              schema: Store.schema,
              operation: 'query',
              fieldName: 'storeByIds',
              args: { ids: storeIds },
              context: context,
              info: info
            }
          );
        },
      },
    },
    Store: {
      agents: {
        fragment: `fragment StoreFragment on Fragment { id }`,
        resolve(parent, args, context, info) {
          const storeId = parent.id;
          return mergeInfo.delegateToSchema(
            {
              schema: Agent.schema,
              operation: 'query',
              fieldName: 'agentByStoreId',
              args: { storeId: storeId },
              context: context,
              info: info
            }
          );
        },
      },
    }
  })
});

const schemaRoot = Object.assign({}, Store.funct, Agent.funct, Region.funct, Country.funct)

module.exports = {
  schema: schema,
  schemaRoot: schemaRoot
}
