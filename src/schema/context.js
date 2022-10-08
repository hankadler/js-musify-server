import config from "../config";
import variables from "./variables";
import Song from "../api/v1/songs/model";
import Album from "../api/v1/albums/model";
import Artist from "../api/v1/artists/model";

const _refreshVariables = async (req) => {
  const songIds = (await Song.find()).map(({ _id }) => _id.toString());
  const songId = songIds.slice(-1)[0] || "";
  variables.songIds = songIds;
  variables.songId = songId;

  const albumIds = (await Album.find()).map(({ _id }) => _id.toString());
  const albumId = albumIds.slice(-1)[0] || "";
  variables.albumIds = albumIds;
  variables.albumId = albumId;

  const artistIds = (await Artist.find()).map(({ _id }) => _id.toString());
  const artistId = artistIds.slice(-1)[0] || "";
  variables.artistIds = artistIds;
  variables.artistId = artistId;

  req.body.variables = variables;
};

const context = async ({ req }) => {
  if (!config.env.startsWith("prod")) await _refreshVariables(req);
};

export default context;
