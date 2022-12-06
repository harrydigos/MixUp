import { Component, OnInit, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavbarStateService } from 'src/app/global/services';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  libraryNavState: 'favorites' | 'playlists' = 'favorites';
  @Input() searchText: string = 'Search in favorites';


  //Array with favorite songs (Will change this with DB)

  public songArray: Array<{ title: string; artist: string; image: string }> = [
    {
      title: 'Losing It',
      artist: 'FISHER',
      image: 'astronaut_in_the_ocean.jpg',
    },
    {
      title: 'Blinding Lights',
      artist: 'The Weeknd',
      image: 'blinding_lights.jpg',
    },
    { title: 'Flying', artist: 'Curbi', image: 'astronaut_in_the_ocean.jpg' },
    {
      title: 'The Hills',
      artist: 'The Weeknd',
      image: 'astronaut_in_the_ocean.jpg',
    },
    {
      title: 'On and On',
      artist: 'The Score',
      image: 'astronaut_in_the_ocean.jpg',
    },
    {
      title: 'GREECE',
      artist: 'Dj Khaled, Drake',
      image: 'astronaut_in_the_ocean.jpg',
    },
    {
      title: 'Circles',
      artist: 'Post Malone',
      image: 'astronaut_in_the_ocean.jpg',
    },
    {
      title: 'On our Way',
      artist: 'The Royal Concept',
      image: 'astronaut_in_the_ocean.jpg',
    },
    { 
      title: 'Drown',
      artist: 'Kovic',
      image: 'astronaut_in_the_ocean.jpg' },
    {
      title: 'Sweater Weather',
      artist: 'The Neighbourhood',
      image: 'astronaut_in_the_ocean.jpg',
    },
    {
      title: 'First Class',
      artist: 'Jack Harlow',
      image: 'astronaut_in_the_ocean.jpg',
    },
    {
      title: 'WHATS POPPIN',
      artist: 'Jack Harlow',
      image: 'astronaut_in_the_ocean.jpg',
    },
    {
      title: 'Tyler Herro',
      artist: 'Jack Harlow',
      image: 'astronaut_in_the_ocean.jpg',
    },
  ];

  displayValue: string = '';
  public numberofsongs: number = this.songArray.length;

  //If we implement remove from favorites (error with SVG)

  rmSongFav(songname: any){
    const index = this.songArray.findIndex(object => {
      return object.title === songname;
    });
    if (index > -1) {
      this.songArray.splice(index, 1);
    }
  }

  constructor(private navbarState: NavbarStateService) {
    this.navbarState.setLibraryNavState('favorites');
  }

  ngOnInit(): void {
    this.navbarState.libraryNavState$.subscribe(
      (event) => (this.libraryNavState = event)
    );
  }
}
