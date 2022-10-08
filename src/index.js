import Logger from "loguno";
import { ApolloServer } from "apollo-server-express";
import api from "./api";
import db from "./db";
import { typeDefs, resolvers, context, dataSources } from "./schema";
import config from "./config";

Logger.outlets[0].colors.inverted = false;
Logger.outlets[0].colors.bg.enabled = false;

const main = async () => {
  await db.connect(config.db.uri[config.env]);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
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
