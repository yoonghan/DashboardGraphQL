`use strict`

var {
  makeExecutableSchema,
  introspectSchema,
  mergeSchemas
} = require ('graphql-tools');

var countries = [
  {
    id: 1,
    name: "Singapore",
    regionIds: [12, 13]
  }
]


const Country = {
  schema: makeExecutableSchema({
    typeDefs: `
      type Country {
        id: Int,
        name: String,
        regionIds: [Int]
      }

      type Query {
        countriesBy(name: String): [Country]
        country(id: Int!): Country
        countries: [Country]
      }
    `
  }),
  funct: {
    countriesBy: (args) => {
      const result = countries.filter((country) => args.name===country.name);
      return result;
    },
    country: (args) => {
      const result = countries.filter((country) => args.id===country.id);
      return result.length === 0? {}: result[0];
    },
    countries: () => {
      return countries;
    }
  }
}

module.exports = Country
