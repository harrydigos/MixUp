import { getSongIdByName } from "../songs/songs";

export const initAlbums = () => {
  return [
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
        getSongIdByName("Waiting For Love"),
        getSongIdByName("Talk To Myself"),
        getSongIdByName("Touch Me"),
        getSongIdByName("Ten More Days"),
        getSongIdByName("For A Better Day"),
        getSongIdByName("Broken Arrows"),
        getSongIdByName("True Believer"),
        getSongIdByName("City Lights"),
        getSongIdByName("Pure Grinding"),
        getSongIdByName("Sunset Jesus"),
        getSongIdByName("Can't Catch Me"),
        getSongIdByName("Somewhere In Stockholm"),
        getSongIdByName("Trouble"),
        getSongIdByName("Gonna Love Ya"),
      ],
    },
  ];
};
