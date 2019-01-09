`use strict`

var {
  makeExecutableSchema,
  introspectSchema,
  mergeSchemas
} = require ('graphql-tools');

var agents = [
  {
    id: 12,
    agentMOId: "WinStore-Sys25Win10IoT16",
    agentVersion: "V3R2.1",
    agentType: "Master Agent",
    deviceId: "Sys25Win10IoT16",
    systemId: "ma-Sys25Win10IoT16.10150",
    ipAddress: "1x.xx4.xxx.xx",
    is64bitOS: true,
    mgmtPort: "10150",
    connectionStatus: "connected",
    storeId: 12,
    maMOId: "WinStore-Sys25Win10IoT16",
    agentAuthState: "authenticated",
    deviceType: 17,
    modelType: 6140,
    modelNumber: 145,
    MACAddress: "JC",
    networkMask: "255.255.255.0",
    isMasked: false,
    isMCF: false,
    osValue: 86
  },
  {
    id: 13,
    agentMOId: "WinStore-Sys25Win10IoT17",
    agentVersion: "V3R2.1",
    agentType: "General Agent",
    deviceId: "Sys25Win10IoT16",
    systemId: "ma-Sys25Win10IoT16.10150",
    ipAddress: "12.204.204.12",
    is64bitOS: true,
    mgmtPort: "10150",
    connectionStatus: "connected",
    storeId: 12,
    maMOId: "WinStore-Sys25Win10IoT16",
    agentAuthState: "authenticated",
    deviceType: 17,
    modelType: 6140,
    modelNumber: 145,
    MACAddress: "JC",
    networkMask: "255.255.255.0",
    isMasked: false,
    isMCF: false,
    osValue: 86
  },
  {
    id: 14,
    agentMOId: "WinStore-Sys25Win10IoT17",
    agentVersion: "V3R2.1",
    agentType: "General Agent",
    deviceId: "Sys25Win10IoT16",
    systemId: "ma-Sys25Win10IoT16.10150",
    ipAddress: "12.204.204.12",
    is64bitOS: true,
    mgmtPort: "10150",
    connectionStatus: "connected",
    storeId: 13,
    maMOId: "WinStore-Sys25Win10IoT16",
    agentAuthState: "authenticated",
    deviceType: 17,
    modelType: 6140,
    modelNumber: 145,
    MACAddress: "JC",
    networkMask: "255.255.255.0",
    isMasked: false,
    isMCF: false,
    osValue: 86
  },
  {
    id: 15,
    agentMOId: "WinStore-Sys25Win10IoT17",
    agentVersion: "V3R2.1",
    agentType: "General Agent",
    deviceId: "Sys25Win10IoT16",
    systemId: "ma-Sys25Win10IoT16.10150",
    ipAddress: "12.204.204.12",
    is64bitOS: false,
    mgmtPort: "10150",
    connectionStatus: "connected",
    storeId: 13,
    maMOId: "WinStore-Sys25Win10IoT16",
    agentAuthState: "authenticated",
    deviceType: 17,
    modelType: 6140,
    modelNumber: 145,
    MACAddress: "JC",
    networkMask: "255.255.255.0",
    isMasked: false,
    isMCF: false,
    osValue: 86
  }
]


const Agent = {
  schema: makeExecutableSchema({
    typeDefs: `
      type Agent {
        id: Int
        agentMOId: String
        agentVersion: String
        agentType: String
        deviceId: String
        systemId: String
        ipAddress: String
        is64bitOS: Boolean
        mgmtPort: String
        connectionStatus: String
        storeId: Int
        maMOId: String
        agentAuthState: String
        deviceType: Int
        modelType: Int
        modelNumber: Int
        MACAddress: String
        networkMask: String
        isMasked: Boolean
        isMCF: Boolean
        osValue: Int
      }

      type Query {
        agent(id: Int!): Agent
        agentByStoreId(storeId: Int!): [Agent]
        agents: [Agent]
      }
    `
  }),
  funct: {
    agent: (args) => {
      const result = agents.filter((agent) => args.id===agent.id);
      return result.length === 0? {}: result[0];
    },
    agentByStoreId: (args) => {
      const result = agents.filter((agent) => args.storeId===agent.storeId);
      return result;
    },
    agents: () => {
      return agents;
    }
  }
}
module.exports = Agent
