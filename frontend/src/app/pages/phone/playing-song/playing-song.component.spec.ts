import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayingSongComponent } from './playing-song.component';

describe('PlayingSongComponent', () => {
  let component: PlayingSongComponent;
  let fixture: ComponentFixture<PlayingSongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayingSongComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayingSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
