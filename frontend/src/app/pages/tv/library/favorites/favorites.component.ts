import { Component, OnInit } from '@angular/core';
import { TvService } from 'src/app/services/tv.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  songs = [
    {
      title: "God's Plan",
      artist: 'Drake',
      album: 'Scorpion',
      duration: '3:50',
    },
    {
      title: "God's Plan",
      artist: 'Drake',
      album: 'Scorpion',
      duration: '3:50',
    },
    {
      title: "God's Plan",
      artist: 'Drake',
      album: 'Scorpion',
      duration: '3:50',
    },
    {
      title: "God's Plan",
      artist: 'Drake',
      album: 'Scorpion',
      duration: '3:50',
    },
    {
      title: "God's Plan",
      artist: 'Drake',
      album: 'Scorpion',
      duration: '3:50',
    },
  ];

  constructor(private tvService: TvService) {
    this.tvService.setLibraryNavState('favorites');
  }

  ngOnInit(): void {}
}
