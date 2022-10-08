const resolvers = {
  Query: {
    artists: async (parent, args, context) => {
      const { data } = await context.dataSources.api.get("artists");
      return data.artists;
    },

    artist: async (parent, args, context) => {
      const { artistId } = args;
      const { data } = await context.dataSources.api.get(`artists/${artistId}`);
      return data.artist;
    },
  },

  Mutation: {
    deleteArtists: async (parent, args, context) => {
      const { data, error } = await context.dataSources.api.delete("artists");
      if (error) throw error;
      return data;
    },

    createArtist: async (parent, { input }, context) => {
      const { data, error } = await context.dataSources.api.post("artists", input);
      if (error) throw error;
      return data.artist;
    },

    updateArtist: async (parent, { artistId, input }, context) => {
      const { data, error } = await context.dataSources.api.patch(`artists/${artistId}`, input);
      if (error) throw error;
      return data.artist;
    },

    deleteArtist: async (parent, { artistId }, context) => {
      const { data, error } = await context.dataSources.api.delete(`artists/${artistId}`);
      if (error) throw error;
      return data;
    },

    addAlbumsToArtist: async (parent, { artistId, albumIds }, context) => {
      const { artist } = (await context.dataSources.api.get(`artists/${artistId}`)).data;
      const { albumIds: _albumIds } = artist;
      const { data, error } = await context.dataSources.api.patch(`artists/${artistId}`, {
        albumIds: [..._albumIds, ...albumIds]
      });
      if (error) throw error;
      return data.artist;
    }
  },

  Artist: {
    albums: async (parent, args, context) => {
      const albumIds = parent?.albumIds || [];
      const { data } = await context.dataSources.api.get("albums");
      const albums = data?.albums || [];
      return albums.filter(({ _id }) => albumIds.includes(_id)) || albums;
    }
  }
};

export default resolvers;
