import * as express from "express";
import { AlbumController } from "./albums/albums.controller";
import { ExampleController } from "./example/example.controller";
import { ItemShopController } from "./item-shop/item-shop.controller";
import { TaskController } from "./task/task.controller";
const apiV1Router = express.Router();

apiV1Router
  // Example routes
  .use("/example", new ExampleController().applyRoutes())
  .use("/item-shop", new ItemShopController().applyRoutes())
  .use("/tasks", new TaskController().applyRoutes())

  // Our routes

  // Album routes
  .use("/albums", new AlbumController().applyRoutes());

export { apiV1Router };
