import { Document, Schema, Model, model } from "mongoose";
import { DefaultSchemaOptions } from "../../../models/shared";

export interface IAlbum extends Document {
  name: string;
  artist: string;
  image: string;
  isFavorite: boolean;
  noTracks: number;
}

const albumSchema = new Schema(
  {
    name: { type: String, required: true },
    artist: { type: String, required: true },
    image: { type: String, required: true },
    isFavorite: { type: Boolean, default: false },
    noTracks: { type: Number, default: 0 },
  },
  { ...DefaultSchemaOptions }
);

export const AlbumModel: Model<IAlbum> = model<IAlbum>(
  "Album",
  albumSchema,
  "Album"
);
