import { Request, Response, Router } from "express";
import { ResourceController } from "../../shared";
import { StatusCodes } from "http-status-codes";
import { Logger } from "../../shared/utils/logger";
import { AlbumModel, IAlbum } from "./album.model";

export class AlbumController extends ResourceController<IAlbum> {
  private logger: Logger = new Logger();
  constructor() {
    super(AlbumModel);
  }

  public applyRoutes(): Router {
    const router = Router();
    router.get("/", this.getAlbums).get("/init", this.initializeAlbums);

    return router;
  }

  getAlbums = async (req: Request, res: Response) => {
    this.logger.debug("getAlbums request");
    const allAlbums = await this.getAll(req, res);
    return res.status(StatusCodes.OK).json(allAlbums);
  };

  initializeAlbums = async (req: Request, res: Response) => {
    this.logger.debug("Initialize albums request");
    let albums = [
      {
        name: "The Car",
        artist: "Arctic Monkeys",
        image: "the_car.jpg",
      },
      {
        name: "Dawn FM",
        artist: "The Weeknd",
        image: "dawn_fm.jpg",
      },
      {
        name: "Midnights",
        artist: "Taylor Swift",
        image: "midnights.jpg",
      },
      {
        name: "Renaissance",
        artist: "Beyoncé",
        image: "renaissance.jpg",
      },
      {
        name: "Innate Passage",
        artist: "Elder",
        image: "innate_passage.jpg",
      },
      {
        name: "Mr. Morale & The Big Steppers",
        artist: "Kendrick Lamar",
        image: "mr_morale_&_the_big_steppers.jpg",
      },
      {
        name: "Hybrid Theory",
        artist: "Linkin Park",
        image: "hybrid_theory.jpg",
      },
      {
        name: "Music To Be Murdered By",
        artist: "Eminem",
        image: "music_to_be_murdered_by.jpg",
      },
      {
        name: "Hollywood's Bleeding",
        artist: "Post Malone",
        image: "hollywoods_bleeding.jpg",
      },
      {
        name: "Meet The Woo",
        artist: "Pop Smoke",
        image: "meet_the_woo.jpg",
      },
      {
        name: "Starboy",
        artist: "The Weeknd",
        image: "starboy.jpg",
      },
    ];

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
