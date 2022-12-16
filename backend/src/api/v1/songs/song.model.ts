import { Document, Schema, Model, model, Types } from "mongoose";
import { DefaultSchemaOptions } from "../../../models/shared";

export interface ISong extends Document {
  _id: Types.ObjectId;
  title: string;
  artist: string;
  album: string;
  duration: number;
  isFavorite: boolean;
  image?: string;
}

const songSchema = new Schema(
  {
    _id: { type: Types.ObjectId, required: true },
    title: { type: String, required: true },
    artist: { type: String, required: true },
    album: { type: String, required: true },
    duration: { type: Number, required: true },
    isFavorite: { type: Boolean, required: true },
    image: { type: String, default: "" },
  },
  { ...DefaultSchemaOptions },
);

export const SongModel: Model<ISong> = model<ISong>("Song", songSchema, "Song");
