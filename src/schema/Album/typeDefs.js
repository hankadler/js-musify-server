import { gql } from "apollo-server-express";

const typeDefs = gql`
  extend type Query {
    albums: [Album!]!
    album(albumId: ID!): Album
  }
  
  extend type Mutation {
    deleteAlbums: DeleteOutput!
    createAlbum(input: CreateAlbumInput!): Album
    updateAlbum(input: UpdateAlbumInput!): Album
    deleteAlbum(input: DeleteAlbumInput!): DeleteOutput!
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
    albumId: ID!
    number: Int
    name: String
    year: Int
    songIds: [ID!]
  }

  input DeleteAlbumInput {
    albumId: ID!
  }
`;

export default typeDefs;
