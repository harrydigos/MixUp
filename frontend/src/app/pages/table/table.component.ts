import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { AlbumModel } from 'src/app/global/models';
import { AlbumsService } from 'src/app/global/services';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  favAlbums: AlbumModel[] = [];
  // TODO: Song model
  favSongs: string[] = [];
  queueSongs: string[] = [];

  @ViewChild('table') table?: ElementRef;
  @ViewChild('menu') menu?: ElementRef;
  @ViewChild('close') close?: ElementRef;

  @ViewChild('favorites') favorites?: ElementRef;
  @ViewChild('queue') queue?: ElementRef;

  mouseX: number | undefined;
  mouseY: number | undefined;

  isPlaying: boolean = true;
  volume: boolean = true;

  constructor(
    private renderer: Renderer2,
    private albumsService: AlbumsService
  ) {}

  ngOnInit(): void {
    this.albumsService.getAll().subscribe((result) => {
      this.favAlbums = result.filter((album) => album.isFavorite);
    });
  }

  toggleMenu(event: MouseEvent): void {
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
    this.renderer.setStyle(
      this.menu!.nativeElement,
      'left',
      `${this.mouseX}px`
    );
    this.renderer.addClass(this.menu!.nativeElement, '__show');
  }

  getMousePosition = (event: MouseEvent): void => {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
  };

  closeMenu(): void {
    this.renderer.removeClass(this.menu!.nativeElement, '__show');
  }

  showFavorites(): void {
    this.renderer.removeClass(this.queue!.nativeElement, '__show');
    this.renderer.addClass(this.favorites!.nativeElement, '__show');
    this.renderer.removeClass(this.menu!.nativeElement, '__show');
  }

  closeFavorites(): void {
    this.renderer.removeClass(this.favorites!.nativeElement, '__show');
  }

  showQueue(): void {
    this.renderer.removeClass(this.favorites!.nativeElement, '__show');
    this.renderer.addClass(this.queue!.nativeElement, '__show');
    this.renderer.removeClass(this.menu!.nativeElement, '__show');
  }

  closeQueue(): void {
    this.renderer.removeClass(this.queue!.nativeElement, '__show');
  }

  togglePlay(): void {
    this.isPlaying = !this.isPlaying;
  }

  toggleMute(): void {
    this.volume = !this.volume;
  }
}
