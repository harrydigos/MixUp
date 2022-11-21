import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvNavbarComponent } from './tv-navbar.component';

describe('TvNavbarComponent', () => {
  let component: TvNavbarComponent;
  let fixture: ComponentFixture<TvNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TvNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TvNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
