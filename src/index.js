import Logger from "loguno";
import { ApolloServer } from "apollo-server-express";
import api from "./api";
import db from "./db";
import { typeDefs, resolvers, dataSources } from "./schema";
import config from "./config";

Logger.outlets[0].colors.inverted = false;
Logger.outlets[0].colors.bg.enabled = false;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({ api: new dataSources.Musify() }),
});

server.start()
  .then(() => server.applyMiddleware({
    app: api,
    path: "/musify/graphql",
  }))
  .catch((error) => Logger.logError(error.message));

api.listen(config.api.port, () => {
  db.connect(config.db.uri[config.env]).then(() => {
    Logger.logInfo(`RestAPI: ${config.api.baseURL}`);
    Logger.logInfo(`GraphQL: ${config.api.host}${server.graphqlPath}`);
  });
});
