import { gql } from "apollo-server-express";

const typeDefs = gql`
  extend type Query {
    albums: [Album!]!
    album(albumId: ID!): Album
  }
  
  extend type Mutation {
    deleteAlbums: DeleteOutput!
    createAlbum(input: CreateAlbumInput!): Album
    updateAlbum(albumId: ID!, input: UpdateAlbumInput!): Album
    deleteAlbum(albumId: ID!): DeleteOutput!
    addSongsToAlbum(albumId: ID!, songIds: [ID!]!): Album
  }
 
  type Album {
    _id: ID!
    number: Int!
    name: String!
    year: Int!
    songIds: [ID!]!
    songs: [Song!]!
  }

  input CreateAlbumInput {
    number: Int!
    name: String!
    year: Int!
    songIds: [ID!]!
  }

  input UpdateAlbumInput {
    number: Int
    name: String
    year: Int
    songIds: [ID!]
  }
`;

export default typeDefs;
