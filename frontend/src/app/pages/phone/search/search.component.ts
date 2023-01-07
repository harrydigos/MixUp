import { Component, OnInit } from '@angular/core';
import { GENRES, recentSearches } from 'src/app/global/utils';
import { AlbumDummyModel, NavbarState } from 'src/app/global/models';
import { SmartSpeakerService, SongPlayingService } from 'src/app/global/services';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  navState: NavbarState = 'search';

  isPlaying: boolean = false;
  musicGenres = GENRES.slice(0, 6);

  recentSearches: AlbumDummyModel[] = recentSearches;
  displaySearchValue: string = 'blank';

  searchSong: string[] = [
    'the weeknd blinding lights',
    'weeknd blinding lights',
    'blinding lights',
    'blinding',
    'lights',
  ];

  constructor(private songPlayingService: SongPlayingService, private smartSpeakerService: SmartSpeakerService) {}

  ngOnInit(): void {
    this.songPlayingService.isPlaying$.subscribe((isPlaying) => (this.isPlaying = isPlaying));
  }

  getvalue(val: string) {
    this.displaySearchValue = val;
    this.checksearch(val);
  }

  checksearch(displaySearchValue: string) {
    if (
      displaySearchValue == 'the weeknd' ||
      displaySearchValue == 'The Weeknd' ||
      displaySearchValue == 'Weeknd' ||
      displaySearchValue == 'weeknd'
    ) {
      //only in the weeknd results
      this.displaySearchValue = "Showing results for '" + displaySearchValue + "'";
    } else {
      this.displaySearchValue = "Showing results for '" + displaySearchValue + "'";
    }
  }

  searchVoice = () => {
    if (this.smartSpeakerService.isListening) return;

    this.smartSpeakerService.initialize();
    this.smartSpeakerService.addCommand(this.searchSong, (result: string) => {
      this.smartSpeakerService.speak('Searching for ' + result);
    });
    this.smartSpeakerService.start();
  };
}
