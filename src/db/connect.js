import Logger from "loguno";
import mongoose from "mongoose";

/**
 * Connects to mongoDB.
 *
 * @param {string} uri - A mongoDB connection string.
 * @returns {Promise} - A connection object.
 */
const connect = async (uri) => {
  const conn = await mongoose.connect(uri);
  const { host, port, name } = conn.connections[0];
  Logger.logInfo(`mongodb://${host}:${port}/${name}`);
  return conn;
};

export default connect;
