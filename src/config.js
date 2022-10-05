import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import "dotenv/config";

/**
 * App configuration. To change edit ``../.env``.
 */
const srcDir = dirname(fileURLToPath(import.meta.url));
const testDir = resolve(`${srcDir}/../test`);
const env = process.env.ENV || "dev";
const api = {
  name: process.env.APP || "app",
  version: process.env.VERSION || "1",
  port: process.env.PORT || "3000"
};
api.host = env.startsWith("prod") ? process.env.HOST : `http://localhost:${api.port}`;
api.path = `/${api.name}/api/v${api.version}`;
api.baseURL = `${api.host}${api.path}`;
const db = {
  name: env.startsWith("prod") ? api.name : `${api.name}-${env}`,
  uri: {
    dev: `${process.env.MONGO_DB_URI}/${api.name}-dev?retryWrites=true&w=majority`,
    test: `${process.env.MONGO_DB_URI}/${api.name}-test?retryWrites=true&w=majority`,
    prod: `${process.env.MONGO_DB_URI}/${api.name}?retryWrites=true&w=majority`
  }
};
const {
  JWT_SECRET: jwtSecret,
  JWT_EXPIRES_IN: jwtExpiresIn,
  ADMIN_PASS: adminPass,
  DOMAIN: domain
} = process.env;

export default {
  srcDir,
  testDir,
  env,
  api,
  db,
  jwtSecret,
  jwtExpiresIn,
  adminPass,
  domain
};
