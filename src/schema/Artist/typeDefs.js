import { gql } from "apollo-server-express";

const typeDefs = gql`
  extend type Query {
    artists: [Artist!]!
    artist(artistId: ID!): Artist
  }
  
  extend type Mutation {
    deleteArtists: DeleteOutput!
    createArtist(input: CreateArtistInput!): Artist
    updateArtist(input: UpdateArtistInput!): Artist
    deleteArtist(input: DeleteArtistInput!): DeleteOutput!
    addAlbumsToArtist(input: AddAlbumsToArtistInput!): Artist
  }
 
  type Artist {
    _id: ID!
    name: String!
    albumIds: [ID!]!
    albums: [Album!]!
  }

  input CreateArtistInput {
    name: String!
    albumIds: [ID!]!
  }

  input UpdateArtistInput {
    artistId: ID!
    name: String
    albumIds: [ID!]
  }

  input DeleteArtistInput {
    artistId: ID!
  }
  
  input AddAlbumsToArtistInput {
    artistId: ID!
    albumIds: [ID!]
  }
`;

export default typeDefs;
