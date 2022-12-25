import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AlbumModel, SongModel } from 'src/app/global/models';
import { AlbumsService, QueueService, SocketsService, SongPlayingService, SongsService } from 'src/app/global/services';

let disc: any = null;

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @ViewChild('table') table?: ElementRef;
  @ViewChild('menu') menu?: ElementRef;
  @ViewChild('close') close?: ElementRef;
  @ViewChild('favorites') favorites?: ElementRef;
  @ViewChild('queue') queue?: ElementRef;
  @ViewChild('disc') disc?: ElementRef;

  favAlbums: AlbumModel[] = [];
  favSongs: SongModel[] = [];
  queueSongs: SongModel[] = [];
  queueSongsPlayed: SongModel[] = [];
  songPlaying: SongModel = {} as SongModel;

  mouseX?: number;
  mouseY?: number;
  isPlaying: boolean = false;
  isMuted: boolean = false;
  wallIsOpen: boolean = false;

  /* Disc rotation variables */
  active: boolean = false;
  angle: number = 0;
  rotation: number = 0;
  startAngle: number = 0;
  center: { x: number; y: number } = {
    x: 0,
    y: 0,
  };
  R2D: number = 180 / Math.PI;
  styleRotation: number = 0;

  constructor(
    private renderer: Renderer2,
    private albumsService: AlbumsService,
    private socketsService: SocketsService,
    private songsService: SongsService,
    private songPlayingService: SongPlayingService,
    private queueService: QueueService,
  ) {}

  ngOnInit(): void {
    /* Favorite Songs & Albums */
    this.songsService.getAll().subscribe((songs) => (this.favSongs = songs.filter((song) => song.isFavorite)));
    this.albumsService.getAll().subscribe((result) => (this.favAlbums = result.filter((album) => album.isFavorite)));

    this.socketsService.subscribe('updateFavoriteAlbum', (album: AlbumModel) => {
      if (album.isFavorite) this.favAlbums.push(album);
      else this.favAlbums = this.favAlbums.filter((favAlbum) => favAlbum._id !== album._id);
    });

    this.socketsService.subscribe('updateFavoriteSong', (song: SongModel) => {
      if (song.isFavorite) this.favSongs.push(song);
      else this.favSongs = this.favSongs.filter((favSong) => favSong._id !== song._id);
    });

    /* Queue & Playing Song & Wall */
    this.songPlayingService.songPlaying$.subscribe((song) => (this.songPlaying = song));

    //TODO: when user drags the disc, currentTime$ is updated
    this.songPlayingService.currentTime$.subscribe((currentTime) => console.log(currentTime)); // Works

    this.queueService.queue$.subscribe((queue) => (this.queueSongs = queue));

    this.songPlayingService.isPlaying$.subscribe((isPlaying) => {
      this.isPlaying = isPlaying;
      clearInterval(disc);
      this.playAnimDisc();
    });

    this.socketsService.subscribe('wallIsOpen', (isOpen: boolean) => (this.wallIsOpen = isOpen));
    this.socketsService.subscribe('mute', (mute: boolean) => (this.isMuted = mute));
  }

  getMousePosition = (event: MouseEvent) => {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
  };

  toggleMenu = (event: MouseEvent) => {
    if (
      event.target === this.close!.nativeElement ||
      event.target !== this.table!.nativeElement ||
      this.menu!.nativeElement.classList.contains('__show')
    )
      return;

    console.log(this.mouseX, this.mouseY);
    // Bounds for the menu
    if (this.mouseX! > 1750 || this.mouseY! > 980) return;

    this.renderer.setStyle(this.menu!.nativeElement, 'top', `${this.mouseY}px`);
    this.renderer.setStyle(this.menu!.nativeElement, 'left', `${this.mouseX}px`);
    this.renderer.addClass(this.menu!.nativeElement, '__show');
  };

  closeMenu = () => this.renderer.removeClass(this.menu!.nativeElement, '__show');

  showFavorites = () => {
    this.renderer.removeClass(this.queue!.nativeElement, '__show');
    this.renderer.addClass(this.favorites!.nativeElement, '__show');
    this.renderer.removeClass(this.menu!.nativeElement, '__show');
  };

  closeFavorites = () => this.renderer.removeClass(this.favorites!.nativeElement, '__show');

  showQueue = () => {
    this.renderer.removeClass(this.favorites!.nativeElement, '__show');
    this.renderer.addClass(this.queue!.nativeElement, '__show');
    this.renderer.removeClass(this.menu!.nativeElement, '__show');
  };

  closeQueue = () => this.renderer.removeClass(this.queue!.nativeElement, '__show');

  playQueueSong = (song: SongModel) => {
    this.songPlayingService.setSongPlaying(song);
    this.songPlayingService.setPlay(true);
    this.queueService.remove(song);
  };

  navigateSongs = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      //TODO: Navigate to previous song
    } else {
      this.playQueueSong(this.queueSongs[0]);
    }
  };

  togglePlay = () => {
    this.songPlayingService.setPlay(!this.isPlaying);
    clearInterval(disc);
  };

  toggleMute = () => this.socketsService.publish('mute', !this.isMuted);

  toggleWall = () => this.socketsService.publish('wallIsOpen', !this.wallIsOpen);

  /* Disc Animation & Drag */

  startDragDisc = (e: MouseEvent) => {
    if (this.active) return;
    e.preventDefault();
    let b = this.disc!.nativeElement.getBoundingClientRect();

    this.center = {
      x: b.left + b.width / 2,
      y: b.top + b.height / 2,
    };

    let x = e.clientX - this.center.x;
    let y = e.clientY - this.center.y;

    this.startAngle = this.R2D * Math.atan2(y, x);
    this.active = true;
  };

  rotateDisc = (e: MouseEvent) => {
    if (!this.active) return;
    e.preventDefault();

    let x = e.clientX - this.center.x;
    let y = e.clientY - this.center.y;
    let d = this.R2D * Math.atan2(y, x);

    this.rotation = d - this.startAngle;
    this.styleRotation = this.angle + this.rotation;

    this.disc!.nativeElement.style.transform = `rotate(${this.styleRotation}deg)`;
    this.disc!.nativeElement.style.cursor = 'grabbing';
  };

  stopDisc = () => {
    this.angle += this.rotation;
    this.active = false;
    this.disc!.nativeElement.style.cursor = 'grab';
  };

  playAnimDisc = () => {
    if (!this.isPlaying || this.active) {
      clearInterval(disc);
      return;
    }
    const frame = () => {
      if (this.active) return;
      this.styleRotation++;
      this.disc!.nativeElement.style.transform = `rotate(${this.styleRotation}deg)`;
    };

    disc = setInterval(frame, 10);
  };
}
