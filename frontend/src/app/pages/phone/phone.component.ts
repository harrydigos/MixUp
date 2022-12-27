import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SongModel, TvNavbarState } from 'src/app/global/models';
import { PhoneNavbarState } from 'src/app/global/models/navbar/phoneNavbarState.model';
import { NavbarStateService, SocketsService, SongPlayingService } from 'src/app/global/services';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.scss'],
})
export class PhoneComponent implements OnInit {

  @ViewChild('player') player!: ElementRef<HTMLAudioElement>;
  navState: PhoneNavbarState = 'home';

  isPlaying: boolean = false;
  song: string = ''; 
  songPlaying: SongModel = {} as SongModel;
  isMuted: boolean = false;

  currSongTime =0;

  constructor(
    private navbarState: NavbarStateService,
    private socketsService: SocketsService,
    private songPlayingService: SongPlayingService,
  ) {}

  ngOnInit(): void {

    this.songPlayingService.currentTime$.subscribe((currentTime) => { this.currSongTime = currentTime; });

    this.songPlayingService.songPlaying$.subscribe((song) => (this.songPlaying = song));
    this.songPlayingService.isPlaying$.subscribe((isPlaying) => (this.isPlaying = isPlaying));
    this.socketsService.subscribe('mute', (mute: boolean) => (this.isMuted = mute));

  }
}
