import { Component, OnInit } from '@angular/core';
import { GENRES, recentSearches } from 'src/app/global/utils';
import { AlbumDummyModel, AlbumModel, SongModel } from 'src/app/global/models';
import {
  AlbumsService,
  PhoneNavbarStateService,
  SmartSpeakerService,
  SongPlayingService,
  SongsService,
} from 'src/app/global/services';

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

  constructor(
    private navbarState: PhoneNavbarStateService,
    private songPlayingService: SongPlayingService,
    private smartSpeakerService: SmartSpeakerService,
    private songsService: SongsService,
    private albumsService: AlbumsService,
  ) {
    this.navbarState.setNavState('search');
  }

  ngOnInit(): void {
    this.songPlayingService.songPlaying$.subscribe((isPlaying) => (this.songPlaying = isPlaying));

    this.songsService.getAll().subscribe((songs) => (this.allSearchResults.songs = songs));
    this.albumsService.getAll().subscribe((albums) => (this.allSearchResults.albums = albums));
  }

  onInputSearch = (event: Event) => {
    this.searchResult = (event.target as HTMLInputElement).value;
    this.fetchSearchResult((event.target as HTMLInputElement).value);
  };

  fetchSearchResult = (input: string) => {
    this.searchResult = input;
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
    this.smartSpeakerService.start();
    setTimeout(() => {
      this.smartSpeakerService.stop();

      // Show results in search
      console.log(this.smartSpeakerService.retValue);
      this.fetchSearchResult(this.smartSpeakerService.retValue);
    }, 3500);
  };

  resetSearch = () => (this.searchResult = '');
}
