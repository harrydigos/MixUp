import { Component, OnInit , Input ,Output ,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-song-list-favorites',
  templateUrl: './song-list-favorites.component.html',
  styleUrls: ['./song-list-favorites.component.scss']
})
export class SongListFavoritesComponent implements OnInit {

  @Input() artist: string = '';
  @Input() imgUrl: string = '';
  @Input() song: string = '';

  //If we will implement song remove from favorites library

  @Output() removeSongFromFavorites = new EventEmitter<string>();

  song2remove:string = '';

  removeSongFav(val: string) {
    this.removeSongFromFavorites.emit(val);
  }

  removefavorites(title:string){
    document.getElementById("heartsvg")?.setAttribute("fill","none");
    this.song2remove = title;
    console.log("Remove from favorites: " + title);
    this.removeSongFav(title);
  }

  ////

  constructor() { }

  ngOnInit(): void {
  }

}
