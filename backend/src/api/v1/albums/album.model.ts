import { Document, Schema, Model, model } from "mongoose";
import { DefaultSchemaOptions } from "../../../models/shared";

export interface IAlbum extends Document {
  name: string;
  artist: string;
  image: string;
}

const albumSchema = new Schema(
  {
    name: { type: String, required: true },
    artist: { type: String, required: true },
    image: { type: String, required: true },
  },
  { ...DefaultSchemaOptions }
);

export const AlbumModel: Model<IAlbum> = model<IAlbum>(
  "Album",
  albumSchema,
  "Album"
);
