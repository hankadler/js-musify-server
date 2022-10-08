import { gql } from "apollo-server-express";

const typeDefs = gql`
  extend type Query {
    songs: [Song!]!
    song(songId: ID!): Song
  }
  
  extend type Mutation {
    deleteSongs: DeleteOutput!
    createSong(input: CreateSongInput!): Song
    updateSong(songId: ID!, input: UpdateSongInput!): Song
    deleteSong(songId: ID!): DeleteOutput!
  }
 
  type Song {
    _id: ID!
    number: Int!
    name: String!
  }

  input CreateSongInput {
    number: Int!
    name: String!
  }

  input UpdateSongInput {
    number: Int
    name: String
  }
`;

export default typeDefs;
