import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongListFavoritesComponent } from './song-list-favorites.component';

describe('SongListFavoritesComponent', () => {
  let component: SongListFavoritesComponent;
  let fixture: ComponentFixture<SongListFavoritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SongListFavoritesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SongListFavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
