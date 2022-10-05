import { gql } from "apollo-server-express";
import Song from "./Song";
import Album from "./Album";
import Artist from "./Artist";

export default gql`
  type Query {
    _: String
  }
  
  type Mutation {
    _: String
  }
  
  type DeleteOutput {
    acknowledged: Boolean!
    deletedCount: Int!
  }
  
  ${Song.typeDefs}
  ${Album.typeDefs}
  ${Artist.typeDefs}
`;
