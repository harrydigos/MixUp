import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AlbumModel } from 'src/app/global/models';
import { AlbumsService } from 'src/app/global/services';

let id: any = null;
let state: number = 0;
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

  @ViewChild('disc') disc?: ElementRef;

  mouseX: number | undefined;
  mouseY: number | undefined;

  isPlaying: boolean = true;
  volume: boolean = true;

  // Disc Rotation

  // var init, rotate, start, stop,
  active: boolean = false;
  angle: number = 0;
  rotation: number = 0;

  startAngle: number = 0;
  center: { x: number; y: number } = {
    x: 0,
    y: 0,
  };
  R2D: number = 180 / Math.PI;
  styleRotation: string = '';

  constructor(private renderer: Renderer2, private albumsService: AlbumsService) {}

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
    this.renderer.setStyle(this.menu!.nativeElement, 'left', `${this.mouseX}px`);
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
    if (this.isPlaying) {
      clearInterval(id);
      state = (this.angle + this.rotation) % 360;
    }
  }

  toggleMute(): void {
    this.volume = !this.volume;
  }

  start(e: MouseEvent) {
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
  }

  rotate(e: MouseEvent): void {
    if (!this.active) return;
    e.preventDefault();
    let x = e.clientX - this.center.x;
    let y = e.clientY - this.center.y;
    let d = this.R2D * Math.atan2(y, x);
    this.rotation = d - this.startAngle;
    this.styleRotation = `rotate(${this.angle + this.rotation}deg)`;
    this.disc!.nativeElement.style.cursor = 'grabbing';
  }

  stop(): void {
    this.angle += this.rotation;
    this.active = false;
    this.disc!.nativeElement.style.cursor = 'grab';
  }

  playAnim(): void {
    if (!this.isPlaying || this.active) return;
    console.log(state);
    let rotate = state ? state : this.angle + this.rotation;
    const frame = () => {
      if (rotate === 360) {
        clearInterval(id);
      } else {
        rotate++;
        state = rotate;
        this.styleRotation = `rotate(${state}deg)`;
      }
    };

    id = setInterval(frame, 10);
  }
}
