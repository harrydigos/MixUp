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
    router
      .get("/init", this.initializeSongs)
      .get("/", this.getSongs)
      .get("/:id", this.getSongById)
      .put("/:id", this.updateSong);

    return router;
  }

  getSongs = async (req: Request, res: Response) => {
    this.logger.debug("getSongs request");
    const allSongs = await this.getAll(req, res);
    return res.status(StatusCodes.OK).json(allSongs);
  };

  getSongById = async (req: Request, res: Response) => {
    const song = await this.getOne(req.params.id, req, res);
    return res.status(StatusCodes.OK).json(song);
  };

  updateSong = async (req: Request, res: Response) => {
    this.logger.debug("updateSong request");
    const song = await this.update(req.params.id, req.body.blacklist, req, res);
    return res.status(StatusCodes.OK).json(song);
  };

  initializeSongs = async (req: Request, res: Response) => {
    this.logger.debug("Initialize songs request");

    await SongModel.insertMany(SONGS)
      .then(function (docs) {
        res.json(docs);
      })
      .catch(function (err) {
        res.status(500);
      });
    return res.status(StatusCodes.OK);
  };
}
