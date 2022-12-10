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
      {
        name: "AM",
        artist: "Arctic Monkeys",
        image: "am.jpg",
        isFavorite: true,
        noTracks: 12,
      },
      {
        name: "A Love Supreme",
        artist: "John Coltrane",
        image: "a_love_supreme.jpg",
        isFavorite: true,
        noTracks: 3,
      },
      {
        name: "Californication",
        artist: "Red Hot Chili Peppers",
        image: "californication.jpg",
        isFavorite: true,
        noTracks: 15,
      },
      {
        name: "Stories",
        artist: "Avicii",
        image: "stories.jpg",
        artistImage: "avicii.jpg",
        isFavorite: true,
        noTracks: 14,
        yearProduced: 2015,
        duration: 55,
        info: "Stories is the second studio album by Swedish electronic music producer Avicii, by PRMD Music and Island Records.",
        songs: [
          { name: "Waiting For Love", duration: 3.5 },
          { name: "Talk To Myself", duration: 3.55 },
          { name: "Touch Me", duration: 3.06 },
          { name: "Ten More Days", duration: 4.05 },
          { name: "For A Better Day", duration: 3.26 },
          { name: "Broken Arrows", duration: 3.52 },
          { name: "True Believer", duration: 4.48 },
          { name: "City Lights", duration: 6.28 },
          { name: "Pure Grinding", duration: 2.51 },
          { name: "Sunset Jesus", duration: 4.24 },
          { name: "Can't Catch Me", duration: 3.59 },
          { name: "Somewhere In Stockholm", duration: 3.22 },
          { name: "Trouble", duration: 2.51 },
          { name: "Gonna Love Ya", duration: 3.35 },
        ],
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
