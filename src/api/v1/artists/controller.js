import { getOrDie } from "../../services/httpService";
import Artist from "./model";

const postArtist = async (req, res) => {
  const { name } = await getOrDie(req.body, "name");
  let { albumIds } = req.body;
  if (typeof albumIds === "string") {
    albumIds = albumIds.split(",");
  }
  const artist = await Artist.create({ name, albumIds });
  return res.status(200).json({ data: { artist } });
};

const getArtists = async (req, res) => {
  const artists = await Artist.find();
  return res.status(200).json({ data: { count: artists.length, artists } });
};

const getArtist = async (req, res) => {
  const { artistId } = await getOrDie(req.params, "artistId");
  const artist = await Artist.findById(artistId);
  return res.status(200).json({ data: { artist } });
};

const patchArtist = async (req, res) => {
  const { artistId } = await getOrDie(req.params, "artistId");
  const { name } = req.body;
  let { albumIds } = req.body;
  if (typeof albumIds === "string") {
    albumIds = albumIds.split(",");
  }
  const artist = await Artist.findByIdAndUpdate(artistId, { name, albumIds });
  return res.status(200).json({ data: { artist } });
};

const deleteArtists = async (req, res) => {
  const response = await Artist.deleteMany();
  return res.status(200).json({ data: response });
};

const deleteArtist = async (req, res) => {
  const { artistId } = await getOrDie(req.params, "artistId");
  const artist = await Artist.findByIdAndDelete(artistId);
  const response = {
    acknowledged: true,
    deletedCount: artist ? 1 : 0
  };
  return res.status(200).json({ data: response });
};

export { postArtist, getArtists, getArtist, patchArtist, deleteArtists, deleteArtist };
