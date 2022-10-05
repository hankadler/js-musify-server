import { getOrDie } from "../../services/httpService";
import Song from "./model";

const postSong = async (req, res) => {
  const { number, name } = await getOrDie(req.body, "number", "name");
  const song = await Song.create({ number, name });
  return res.status(200).json({ data: { song } });
};

const getSongs = async (req, res) => {
  const songs = await Song.find();
  return res.status(200).json({ data: { count: songs.length, songs } });
};

const getSong = async (req, res) => {
  const { songId } = await getOrDie(req.params, "songId");
  const song = await Song.findById(songId);
  return res.status(200).json({ data: { song } });
};

const patchSong = async (req, res) => {
  const { songId } = await getOrDie(req.params, "songId");
  const { number, name } = req.body;
  const song = await Song.findByIdAndUpdate(songId, { number, name });
  return res.status(200).json({ data: { song } });
};

const deleteSongs = async (req, res) => {
  const response = await Song.deleteMany();
  return res.status(200).json({ data: response });
};

const deleteSong = async (req, res) => {
  const { songId } = await getOrDie(req.params, "songId");
  const song = await Song.findByIdAndDelete(songId);
  const response = {
    acknowledged: true,
    deletedCount: song ? 1 : 0
  };
  return res.status(200).json({ data: response });
};

export { postSong, getSongs, getSong, patchSong, deleteSongs, deleteSong };
