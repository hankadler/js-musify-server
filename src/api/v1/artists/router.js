import express from "express";
import {
  postArtist,
  getArtists,
  getArtist,
  patchArtist,
  deleteArtists,
  deleteArtist
} from "./controller";

const router = express.Router();

router.route("/")
  .post(postArtist)
  .get(getArtists)
  .delete(deleteArtists);

router.route("/:artistId")
  .get(getArtist)
  .patch(patchArtist)
  .delete(deleteArtist);

export default router;
