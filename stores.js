`use strict`

var {
  makeExecutableSchema,
  introspectSchema,
  mergeSchemas
} = require ('graphql-tools');

var stores = [
  {
    id: 12,
    ipAddress: "19.122.111.111",
    hostName: "Bryce",
    portNumber: "10149",
    eventFilterFlags: 0,
    connectionStatus: "undiscovered"
  },
  {
    id: 13,
    ipAddress: "19.122.111.111",
    hostName: "Bryce",
    portNumber: "10149",
    eventFilterFlags: 0,
    connectionStatus: "connected"
  },
  {
    id: 14,
    ipAddress: "19.122.111.111",
    hostName: "Bryce",
    portNumber: "10149",
    eventFilterFlags: 0,
    connectionStatus: "connected"
  }
]

const Store = {
  schema: makeExecutableSchema({
    typeDefs: `
      type Store {
        id: Int
        ipAddress: String
        hostName: String
        portNumber: Int
        eventFilterFlags: Int
        connectionStatus: String
      }

      type Query {
        storesBy(hostName: String, ipAddress: String, portNumber:Int, eventFilterFlags:Int, connectionStatus:String): [Store]
        store(id: Int!): Store
        storeByIds(ids: [Int]): [Store]
        stores: [Store]
      }

      input StoreInput {
        ipAddress: String
        hostName: String
        portNumber: Int
        eventFilterFlags: Int
        userName: String
        password: String
      }

      type Mutation {
        storeRegister(input: StoreInput): Store
        storeUpdate(id: Int!, input: StoreInput): Store
      }
    `
  }),
  funct: {
    storesBy: (args) => {
      let filteredStore = stores;
      if(args.hostName) {
        filteredStore = filteredStore.filter((store) => args.hostName===store.hostName);
      }
      if(args.ipAddress) {
        filteredStore = filteredStore.filter((store) => args.ipAddress===store.ipAddress);
      }
      if(args.portNumber) {
        filteredStore = filteredStore.filter((store) => args.portNumber===store.portNumber);
      }
      if(args.eventFilterFlags) {
        filteredStore = filteredStore.filter((store) => args.eventFilterFlags===store.eventFilterFlags);
      }
      if(args.connectionStatus) {
        filteredStore = filteredStore.filter((store) => args.connectionStatus===store.connectionStatus);
      }
      return filteredStore;
    },
    store: (args) => {
      const result = stores.filter((store) => args.id===store.id);
      return result.length === 0? {}: result[0];
    },
    storeByIds: (args) => {
      const result = stores.filter((store) => args.ids.includes(store.id));
      return result;
    },
    stores: () => {
      return stores;
    },
    storeRegister: (args) => {
      const {input} = args;
      stores.push(
        {
          "id": stores[stores.length - 1].id + 1,
          "ipAddress": input.ipAddress,
          "hostName": input.hostName,
          "portNumber": input.portNumber,
          "eventFilterFlags": input.eventFilterFlags,
          "connectionStatus": "connected"
        }
      )
      return stores[stores.length - 1];
    },
    storeUpdate: (args) => {
      const {id, input} = args;
      const store = Store.getStore({id: id});
      console.log(store);
      if(store) {
        store["ipAddress"]=input.ipAddress;
        store["hostName"]=input.hostName;
        store["portNumber"]=input.portNumber;
        store["eventFilterFlags"]=input.eventFilterFlags;
        store["connectionStatus"]="connected";
        return store;
      }
      return null;
    }
  }
}
module.exports = Store
