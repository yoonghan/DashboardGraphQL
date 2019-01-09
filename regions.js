`use strict`

var {
  makeExecutableSchema,
  introspectSchema,
  mergeSchemas
} = require ('graphql-tools');

var regions = [
  {
    id: 12,
    name: "West",
    storeIds: [12, 13]
  },
  {
    id: 13,
    name: "East",
    storeIds: [14]
  }
]


const Region = {
  schema: makeExecutableSchema({
    typeDefs: `
      type Region {
        id: Int,
        name: String,
        storeIds: [Int]
      }

      type Query {
        regionsBy(name: String, stores: [Int]): [Region]
        region(id: Int!): Region
        regionsByIds(ids: [Int]): [Region]
        regions: [Region]
      }
    `
  }),
  funct: {
    regionsBy: (args) => {
      let filteredRegion = regions;
      if(args.name) {
        filteredRegion = filteredRegion.filter((region) => args.name===region.name);
      }
      if(args.stores) {
        filteredRegion = filteredRegion.filter((region) => {
          const result = region.storeIds.find((store) => {
            return args.storeIds.includes(store);
          });
          return (result ? true: false);
        });
      }
      return filteredRegion;
    },
    region: (args) => {
      const result = regions.filter((region) => args.id===region.id);
      return result.length === 0? {}: result[0];
    },
    regionsByIds: (args) => {
      const result = regions.filter((region) => args.ids.includes(region.id));
      return result;
    },
    regions: () => {
      return regions;
    }
  }
}

module.exports = Region
