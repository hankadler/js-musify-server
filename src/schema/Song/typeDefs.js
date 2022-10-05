import { gql } from "apollo-server-express";

const typeDefs = gql`
  extend type Query {
    songs: [Song!]!
    song(songId: ID!): Song
  }
  
  extend type Mutation {
    deleteSongs: DeleteOutput!
    createSong(input: CreateSongInput!): Song
    updateSong(input: UpdateSongInput!): Song
    deleteSong(input: DeleteSongInput!): DeleteOutput!
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
    songId: ID!
    number: Int
    name: String
  }

  input DeleteSongInput {
    songId: ID!
  }
`;

export default typeDefs;
