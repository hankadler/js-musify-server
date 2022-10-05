const resolvers = {
  Query: {
    songs: async (parent, args, context) => {
      const { data } = await context.dataSources.api.get("songs");
      return data.songs;
    },

    song: async (parent, args, context) => {
      const { songId } = args;
      const { data } = await context.dataSources.api.get(`songs/${songId}`);
      return data.song;
    },
  },

  Mutation: {
    deleteSongs: async (parent, args, context) => {
      const { data, error } = await context.dataSources.api.delete("songs");
      if (error) throw error;
      return data;
    },

    createSong: async (parent, { input }, context) => {
      const { data, error } = await context.dataSources.api.post("songs", input);
      if (error) throw error;
      return data.song;
    },

    updateSong: async (parent, { input }, context) => {
      const { data, error } = await context.dataSources.api.patch(`songs/${input.songId}`, input);
      if (error) throw error;
      return data.song;
    },

    deleteSong: async (parent, { input }, context) => {
      const { data, error } = await context.dataSources.api.delete(`songs/${input.songId}`);
      if (error) throw error;
      return data;
    }
  }
};

export default resolvers;
