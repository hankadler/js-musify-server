import setVariables from "../../utils/setVariables";

const resolvers = {
  Query: {
    songs: async (parent, args, context) => {
      const { data } = await context.dataSources.api.get("songs");
      await setVariables({
        context,
        schemaName: "Song",
        operation: "read",
        id: data.songs.slice(-1)[0]?._id,
        ids: data.songs.map(({ _id }) => _id)
      });
      return data.songs;
    },

    song: async (parent, args, context) => {
      const { songId } = args;
      const { data } = await context.dataSources.api.get(`songs/${songId}`);
      await setVariables({
        context,
        schemaName: "Song",
        operation: "read",
        id: data.song?._id
      });
      return data.song;
    },
  },

  Mutation: {
    deleteSongs: async (parent, args, context) => {
      const { data, error } = await context.dataSources.api.delete("songs");
      if (error) throw error;
      await setVariables({
        context,
        schemaName: "Song",
        operation: "delete",
        id: ""
      });
      return data;
    },

    createSong: async (parent, { input }, context) => {
      const { data, error } = await context.dataSources.api.post("songs", input);
      if (error) throw error;
      await setVariables({
        context,
        schemaName: "Song",
        operation: "create",
        id: data.song._id
      });
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
      await setVariables({
        context,
        schemaName: "Song",
        operation: "delete",
        id: ""
      });
      return data;
    }
  }
};

export default resolvers;
