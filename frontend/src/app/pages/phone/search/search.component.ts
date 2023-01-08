import { Component, OnInit } from '@angular/core';
import { GENRES, recentSearches } from 'src/app/global/utils';
import { AlbumDummyModel, AlbumModel, NavbarState, SongModel } from 'src/app/global/models';
import { AlbumsService, SmartSpeakerService, SongPlayingService, SongsService } from 'src/app/global/services';

type SearchResults = {
  albums: AlbumModel[];
  songs: SongModel[];
};

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  navState: NavbarState = 'search';

  songPlaying: SongModel = {} as SongModel;
  musicGenres = GENRES.slice(0, 6);

  recentSearches: AlbumDummyModel[] = recentSearches;
  searchResult: string = '';

  searchResults: SearchResults = {
    albums: [],
    songs: [],
  };

  allSearchResults: SearchResults = {
    albums: [],
    songs: [],
  };

  searchSong: string[] = [
    'the weeknd blinding lights',
    'weeknd blinding lights',
    'blinding lights',
    'blinding',
    'lights',
  ];

  constructor(
    private songPlayingService: SongPlayingService,
    private smartSpeakerService: SmartSpeakerService,
    private songsService: SongsService,
    private albumsService: AlbumsService,
  ) {}

  ngOnInit(): void {
    this.songPlayingService.songPlaying$.subscribe((isPlaying) => (this.songPlaying = isPlaying));

    this.songsService.getAll().subscribe((songs) => (this.allSearchResults.songs = songs));
    this.albumsService.getAll().subscribe((albums) => (this.allSearchResults.albums = albums));
  }

  onInputSearch = (event: Event) => {
    this.searchResult = (event.target as HTMLInputElement).value;
    this.fetchSearchResult();
  };

  fetchSearchResult = () => {
    this.searchResults.songs = this.allSearchResults.songs.filter(
      (song) =>
        song.title.toLowerCase().includes(this.searchResult.toLowerCase()) ||
        song.artist.toLowerCase().includes(this.searchResult.toLowerCase()),
    );
    this.searchResults.albums = this.allSearchResults.albums.filter(
      (album) =>
        album.name.toLowerCase().includes(this.searchResult.toLowerCase()) ||
        album.artist.toLowerCase().includes(this.searchResult.toLowerCase()),
    );
  };

  searchVoice = () => {
    if (this.smartSpeakerService.isListening) return;

    this.smartSpeakerService.initialize();
    this.smartSpeakerService.addCommand(this.searchSong, (result: string) => {
      this.smartSpeakerService.speak('Searching for ' + result);
    });
    this.smartSpeakerService.start();
  };
}
