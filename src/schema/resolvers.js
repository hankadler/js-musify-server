import Song from "./Song";
import Album from "./Album";
import Artist from "./Artist";

const resolvers = {
  Query: {
    ...Song.resolvers.Query,
    ...Album.resolvers.Query,
    ...Artist.resolvers.Query
  },

  Mutation: {
    ...Song.resolvers.Mutation,
    ...Album.resolvers.Mutation,
    ...Artist.resolvers.Mutation
  },

  Album: {
    ...Album.resolvers.Album
  },

  Artist: {
    ...Artist.resolvers.Artist
  }
};

export default resolvers;
