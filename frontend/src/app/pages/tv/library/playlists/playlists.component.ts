import { Component, OnInit } from '@angular/core';
import { TvNavbarStateService } from 'src/app/global/services';
import { playlists } from 'src/app/global/utils';

@Component({
  selector: 'app-playlists',
  template: `
    <div>
      <div>
        <div class="mt-10 flex w-full select-none items-center justify-between text-white">
          <div class="text-[40px] font-semibold">Saved Playlists</div>
          <div class="flex cursor-pointer items-center justify-center gap-4 pr-[100px] hover:opacity-75">
            <div class="text-[28px] font-medium">Sort by</div>
            <img src="assets/Icons/Sort.svg" width="48px" height="48px" />
          </div>
        </div>
        <div class="flex w-full select-none gap-8 pt-4 pr-5">
          <app-tv-lib-card
            class="cursor-pointer"
            *ngFor="let playlist of savedPlaylists"
            [playlistName]="playlist.name"
            [tracks]="playlist.noTracks"
            [imgUrl]="'assets/images/playlists/' + playlist.image"
          ></app-tv-lib-card>
        </div>
      </div>
      <div>
        <div class="mt-10 select-none text-[40px] font-semibold text-white">Playlists that you may like</div>
        <app-card-wrapper>
          <app-tv-lib-card
            *ngFor="let playlist of youMayLikePlaylists"
            [playlistName]="playlist.name"
            [tracks]="playlist.noTracks"
            [imgUrl]="'assets/images/playlists/' + playlist.image"
          ></app-tv-lib-card>
        </app-card-wrapper>
      </div>
    </div>
  `,
})
export class PlaylistsComponent implements OnInit {
  savedPlaylists = playlists.filter((playlist) => playlist.saved);
  youMayLikePlaylists = playlists.filter((playlist) => !playlist.saved);

  constructor(private navbarState: TvNavbarStateService) {
    this.navbarState.setLibraryNavState('playlists');
  }

  ngOnInit(): void {}
}
