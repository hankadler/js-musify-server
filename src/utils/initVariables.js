import Song from "../api/v1/songs/model";
import Album from "../api/v1/albums/model";
import Artist from "../api/v1/artists/model";

const initVariables = async (req) => {
  const songIds = (await Song.find()).map(({ _id }) => _id.toString());
  const songId = songIds.slice(-1)[0] || "";
  const albumIds = (await Album.find()).map(({ _id }) => _id.toString());
  const albumId = albumIds.slice(-1)[0] || "";
  const artistIds = (await Artist.find()).map(({ _id }) => _id.toString());
  const artistId = artistIds.slice(-1)[0] || "";

  req.body.variables.songIds = songIds;
  req.body.variables.songId = songId;
  req.body.variables.albumIds = albumIds;
  req.body.variables.albumId = albumId;
  req.body.variables.artistIds = artistIds;
  req.body.variables.artistId = artistId;
};

export default initVariables;
