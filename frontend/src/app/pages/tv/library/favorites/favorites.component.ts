import { Component, OnInit } from '@angular/core';
import { NavbarStateService } from 'src/app/global/services';

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

  constructor(private navbarState: NavbarStateService) {
    this.navbarState.setLibraryNavState('favorites');
  }

  ngOnInit(): void {}
}
