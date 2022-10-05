import express from "express";
import {
  postSong,
  getSongs,
  getSong,
  patchSong,
  deleteSongs,
  deleteSong
} from "./controller";

const router = express.Router();

router.route("/")
  .post(postSong)
  .get(getSongs)
  .delete(deleteSongs);

router.route("/:songId")
  .get(getSong)
  .patch(patchSong)
  .delete(deleteSong);

export default router;
