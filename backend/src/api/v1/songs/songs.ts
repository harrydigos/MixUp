import { Types } from "mongoose";

const generateSongId = (): Types.ObjectId => {
  return new Types.ObjectId();
};

export const getSongIdByName = (name: string): Types.ObjectId => {
  return SONGS.find((song) => song.name === name)!._id;
};

export const SONGS = [
  { _id: generateSongId(), name: "Waiting For Love", duration: 3.5 },
  { _id: generateSongId(), name: "Talk To Myself", duration: 3.55 },
  { _id: generateSongId(), name: "Touch Me", duration: 3.06 },
  { _id: generateSongId(), name: "Ten More Days", duration: 4.05 },
  { _id: generateSongId(), name: "For A Better Day", duration: 3.26 },
  { _id: generateSongId(), name: "Broken Arrows", duration: 3.52 },
  { _id: generateSongId(), name: "True Believer", duration: 4.48 },
  { _id: generateSongId(), name: "City Lights", duration: 6.28 },
  { _id: generateSongId(), name: "Pure Grinding", duration: 2.51 },
  { _id: generateSongId(), name: "Sunset Jesus", duration: 4.24 },
  { _id: generateSongId(), name: "Can't Catch Me", duration: 3.59 },
  {
    _id: generateSongId(),
    name: "Somewhere In Stockholm",
    duration: 3.22,
  },
  { _id: generateSongId(), name: "Trouble", duration: 2.51 },
  { _id: generateSongId(), name: "Gonna Love Ya", duration: 3.35 },
];
