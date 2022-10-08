import { gql } from "apollo-server-express";

const typeDefs = gql`
  extend type Query {
    artists: [Artist!]!
    artist(artistId: ID!): Artist
  }
  
  extend type Mutation {
    deleteArtists: DeleteOutput!
    createArtist(input: CreateArtistInput!): Artist
    updateArtist(artistId: ID!, input: UpdateArtistInput!): Artist
    deleteArtist(artistId: ID!): DeleteOutput!
    addAlbumsToArtist(artistId: ID!, albumIds: [ID!]!): Artist
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
    name: String
    albumIds: [ID!]
  }
`;

export default typeDefs;
