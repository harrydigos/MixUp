import { Document, Schema, Model, model, Types } from "mongoose";
import { DefaultSchemaOptions } from "../../../models/shared";

export interface IAlbum extends Document {
  name: string;
  artist: string;
  image: string;
  artistImage?: string;
  isFavorite: boolean;
  noTracks: number;
  yearProduced?: number;
  duration?: number;
  info?: string;
  songs?: Types.ObjectId[];
}

const albumSchema = new Schema(
  {
    name: { type: String, required: true },
    artist: { type: String, required: true },
    image: { type: String, required: true },
    artistImage: { type: String, default: "" },
    isFavorite: { type: Boolean, default: false },
    noTracks: { type: Number, default: 0 },
    yearProduced: { type: Number, default: 0 },
    duration: { type: Number, default: 0 },
    info: { type: String, default: "" },
    songs: [{ type: Types.ObjectId, default: "" }],
  },
  { ...DefaultSchemaOptions }
);

export const AlbumModel: Model<IAlbum> = model<IAlbum>(
  "Album",
  albumSchema,
  "Album"
);
