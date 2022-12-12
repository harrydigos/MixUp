import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongActiveComponent } from './song-active.component';

describe('SongActiveComponent', () => {
  let component: SongActiveComponent;
  let fixture: ComponentFixture<SongActiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SongActiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SongActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
