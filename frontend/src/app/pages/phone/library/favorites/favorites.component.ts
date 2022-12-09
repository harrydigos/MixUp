import { Component, OnInit, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PhoneNavbarState } from 'src/app/global/models/navbar/phoneNavbarState.model';
import { NavbarStateService } from 'src/app/global/services';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {

  navState :PhoneNavbarState = "library";

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

  
  public numberofsongs: number = this.songArray.length;
  playBlindingLights: boolean = true;
  songPressed: string ='';
  showMessageQueue: boolean = false;
  showMessageRemove: boolean = false;

  //Open song (mostly check about blinding lights)

  openSong(songname:any){
    this.songPressed = songname;
    if (songname ==='Blinding Lights'){
      console.log("Open blinding lights");
      // this.playBlindingLights = true; 
         
    }
  }

  

  songAdd2Queue(songname:any){
    console.log("Add '" + songname + "' to the queue") ;
    this.songPressed = songname;
    setTimeout(() => {
      this.showMessageQueue = true;
    }, 500);
    
    setTimeout(() => {
      this.showMessageQueue = false;
    }, 2500);
    
  }


  //If we implement remove from favorites (error with SVG)

  rmSongFav(songname: any){
    this.songPressed = songname;
    const index = this.songArray.findIndex(object => {
      return object.title === songname;
    });
    setTimeout(() => {
      if (index > -1) {
        this.songArray.splice(index, 1);
        this.numberofsongs = this.numberofsongs -1;
        this.showMessageRemove = true;
      }
    }, 300);

    setTimeout(() => {
      this.showMessageRemove = false;
    }, 2500);
   
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
