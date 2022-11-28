import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTracksComponent } from './new-tracks.component';

describe('NewTracksComponent', () => {
  let component: NewTracksComponent;
  let fixture: ComponentFixture<NewTracksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewTracksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewTracksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
