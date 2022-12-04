import { Component, OnInit } from '@angular/core';
import { AlbumModel } from 'src/app/global/models';
import { AlbumsService, NavbarStateService } from 'src/app/global/services';
import { genre, genresData } from './genres';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  genres: genre[] = genresData;
  recentSearches: AlbumModel[] = [
    {
      name: "I'm Good(Blue)",
      artist: 'David Guetta',
      image: 'im_good.jpg',
    },
    {
      name: 'Astronaut In The Ocean',
      artist: 'Masked Wolf',
      image: 'astronaut_in_the_ocean.jpg',
    },
    {
      name: 'Blinding Lights',
      artist: 'The Weeknd',
      image: 'blinding_lights.jpg',
    },
    {
      name: 'Rockies',
      artist: 'My Home',
      image: 'rockies.jpg',
    },
  ];

  constructor(private navbarState: NavbarStateService) {
    this.navbarState.setNavState('search');
  }

  ngOnInit(): void {}
}
