import { getOrDie } from "../../services/httpService";
import Album from "./model";

const postAlbum = async (req, res) => {
  const { number, name, year } = await getOrDie(req.body, "number", "name", "year");
  let { songIds } = req.body;
  if (typeof songIds === "string") {
    songIds = songIds.split(",");
  }
  const album = await Album.create({ number, name, year, songIds });
  return res.status(200).json({ data: { album } });
};

const getAlbums = async (req, res) => {
  const albums = await Album.find();
  return res.status(200).json({ data: { count: albums.length, albums } });
};

const getAlbum = async (req, res) => {
  const { albumId } = await getOrDie(req.params, "albumId");
  const album = await Album.findById(albumId);
  return res.status(200).json({ data: { album } });
};

const patchAlbum = async (req, res) => {
  const { albumId } = await getOrDie(req.params, "albumId");
  const { number, name, year } = req.body;
  let { songIds } = req.body;
  if (typeof songIds === "string") {
    songIds = songIds.split(",");
  }
  const album = await Album.findByIdAndUpdate(albumId, { number, name, year, songIds });
  return res.status(200).json({ data: { album } });
};

const deleteAlbums = async (req, res) => {
  const response = await Album.deleteMany();
  return res.status(200).json({ data: response });
};

const deleteAlbum = async (req, res) => {
  const { albumId } = await getOrDie(req.params, "albumId");
  const album = await Album.findByIdAndDelete(albumId);
  const response = {
    acknowledged: true,
    deletedCount: album ? 1 : 0
  };
  return res.status(200).json({ data: response });
};

export { postAlbum, getAlbums, getAlbum, patchAlbum, deleteAlbums, deleteAlbum };
