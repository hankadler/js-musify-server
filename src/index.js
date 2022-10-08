import Logger from "loguno";
import { ApolloServer } from "apollo-server-express";
import api from "./api";
import db from "./db";
import { typeDefs, resolvers, dataSources, variables } from "./schema";
import config from "./config";
import initVariables from "./utils/initVariables";

Logger.outlets[0].colors.inverted = false;
Logger.outlets[0].colors.bg.enabled = false;

const main = async () => {
  await db.connect(config.db.uri[config.env]);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      if (!config.env.startsWith("prod")) {
        // set variables for operations (dev & test only)
        req.body.variables = variables;
        await initVariables(req);
        return {
          variables: req.body.variables
        };
      }
      return null;
    },
    dataSources: () => ({ api: new dataSources.Musify() }),
  });

  await server.start();

  server.applyMiddleware({ app: api, path: "/musify/graphql" });

  api.listen(config.api.port, () => {
    Logger.logInfo(`RestAPI: ${config.api.baseURL}`);
    Logger.logInfo(`GraphQL: ${config.api.host}${server.graphqlPath}`);
  });
};

main().catch((error) => console.log(error.message));
