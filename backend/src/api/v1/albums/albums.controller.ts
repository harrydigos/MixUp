import { Request, Response, Router } from "express";
import { ResourceController } from "../../shared";
import { StatusCodes } from "http-status-codes";
import { Logger } from "../../shared/utils/logger";
import { AlbumModel, IAlbum } from "./album.model";
import { initAlbums } from "./albums";

export class AlbumController extends ResourceController<IAlbum> {
  private logger: Logger = new Logger();
  constructor() {
    super(AlbumModel);
  }

  public applyRoutes(): Router {
    const router = Router();
    router
      .get("/", this.getAlbums)
      .get("/init", this.initializeAlbums)
      .get("/:id", this.getAlbumById)
      .put("/:id", this.updateAlbum);

    return router;
  }

  getAlbums = async (req: Request, res: Response) => {
    this.logger.debug("getAlbums request");
    const allAlbums = await this.getAll(req, res);
    return res.status(StatusCodes.OK).json(allAlbums);
  };

  getAlbumById = async (req: Request, res: Response) => {
    this.logger.debug("getAlbumById request");
    const album = await this.getOne(req.params.id, req, res);
    return res.status(StatusCodes.OK).json(album);
  };

  updateAlbum = async (req: Request, res: Response) => {
    this.logger.debug("updateAlbum request");
    const album = await this.update(
      req.params.id,
      req.body.blacklist,
      req,
      res
    );
    return res.status(StatusCodes.OK).json(album);
  };

  initializeAlbums = async (req: Request, res: Response) => {
    this.logger.debug("Initialize albums request");
    let albums = initAlbums();

    await AlbumModel.insertMany(albums)
      .then(function (docs) {
        res.json(docs);
      })
      .catch(function (err) {
        res.status(500);
      });
    return res.status(StatusCodes.OK);
  };
}
