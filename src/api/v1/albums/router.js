import express from "express";
import {
  postAlbum,
  getAlbums,
  getAlbum,
  patchAlbum,
  deleteAlbums,
  deleteAlbum
} from "./controller";

const router = express.Router();

router.route("/")
  .post(postAlbum)
  .get(getAlbums)
  .delete(deleteAlbums);

router.route("/:albumId")
  .get(getAlbum)
  .patch(patchAlbum)
  .delete(deleteAlbum);

export default router;
