import { Request, Response, Router } from "express";
import { ResourceController } from "../../shared";
import { StatusCodes } from "http-status-codes";
import { Logger } from "../../shared/utils/logger";
import { ISong, SongModel } from "./song.model";
import { Types } from "mongoose";
import { SONGS } from "./songs";

export class SongsController extends ResourceController<ISong> {
  private logger: Logger = new Logger();

  constructor() {
    super(SongModel);
  }

  public applyRoutes(): Router {
    const router = Router();
    router.get("/init", this.initializeSongs).get("/:id", this.getSongById);

    return router;
  }

  getSongById = async (req: Request, res: Response) => {
    const song = await this.getOne(req.params.id, req, res);
    return res.status(StatusCodes.OK).json(song);
  };

  initializeSongs = async (req: Request, res: Response) => {
    this.logger.debug("Initialize songs request");
    let songs = SONGS;

    await SongModel.insertMany(songs)
      .then(function (docs) {
        res.json(docs);
      })
      .catch(function (err) {
        res.status(500);
      });
    return res.status(StatusCodes.OK);
  };
}
