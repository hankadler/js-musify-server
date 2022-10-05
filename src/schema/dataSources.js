import { RESTDataSource } from "apollo-datasource-rest";
import config from "../config";

class Musify extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = config.api.baseURL;
  }
}

const dataSources = { Musify };

export default dataSources;
