import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlbumModel } from 'src/app/global/models';
import { AlbumsService, NavbarStateService } from 'src/app/global/services';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss'],
})
export class AlbumComponent implements OnInit {
  album: AlbumModel = {} as AlbumModel;
  playingSong: string = '';

  constructor(
    private navbarState: NavbarStateService,
    private location: Location,
    private route: ActivatedRoute,
    private albumsService: AlbumsService
  ) {
    this.navbarState.setNavState('hide');
  }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    if (!id) this.back();
    this.albumsService.getById(id!).subscribe((result) => {
      this.album = result;
      this.playSong(this.album.songs[0].name);
    });
  }

  playSong(song: string): void {
    this.playingSong = song;
  }

  getTimeOfSong(duration: number): string {
    let [minutes, seconds] = duration.toString().split('.');
    seconds.length === 1 ? (seconds += '0') : null;
    return `${minutes}:${seconds}`;
  }

  back() {
    this.location.back();
  }
}
