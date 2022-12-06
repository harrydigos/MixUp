import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {
  libraryNavState: 'favorites' | 'playlists' = 'favorites';

  constructor() { }

  ngOnInit(): void {
  }

}
