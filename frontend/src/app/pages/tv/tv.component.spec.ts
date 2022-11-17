import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TVComponent } from './tv.component';

describe('TVComponent', () => {
  let component: TVComponent;
  let fixture: ComponentFixture<TVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TVComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
