import * as express from "express";
import { AlbumController } from "./albums/albums.controller";
import { SongsController } from "./songs/songs.controller";
const apiV1Router = express.Router();

apiV1Router
  // Routes
  .use("/albums", new AlbumController().applyRoutes())
  .use("/songs", new SongsController().applyRoutes());

export { apiV1Router };
