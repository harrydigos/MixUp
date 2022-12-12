import { Document, Schema, Model, model, Types } from "mongoose";
import { DefaultSchemaOptions } from "../../../models/shared";

export interface ISong extends Document {
  _id: Types.ObjectId;
  name: string;
  duration: number;
}

const songSchema = new Schema(
  {
    _id: { type: Types.ObjectId, required: true },
    name: { type: String, required: true },
    duration: { type: Number, default: 0 },
  },
  { ...DefaultSchemaOptions }
);

export const SongModel: Model<ISong> = model<ISong>("Song", songSchema, "Song");
