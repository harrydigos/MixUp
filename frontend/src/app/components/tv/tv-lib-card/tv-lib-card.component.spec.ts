import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvLibCardComponent } from './tv-lib-card.component';

describe('TvLibCardComponent', () => {
  let component: TvLibCardComponent;
  let fixture: ComponentFixture<TvLibCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TvLibCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TvLibCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
