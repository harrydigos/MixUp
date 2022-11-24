import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvSongTableComponent } from './tv-song-table.component';

describe('TvSongTableComponent', () => {
  let component: TvSongTableComponent;
  let fixture: ComponentFixture<TvSongTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TvSongTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TvSongTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
