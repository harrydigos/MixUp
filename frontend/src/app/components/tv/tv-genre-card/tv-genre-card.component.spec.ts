import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvGenreCardComponent } from './tv-genre-card.component';

describe('TvGenreCardComponent', () => {
  let component: TvGenreCardComponent;
  let fixture: ComponentFixture<TvGenreCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TvGenreCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TvGenreCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
