import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneCardComponent } from './phone-card.component';

describe('PhoneCardComponent', () => {
  let component: PhoneCardComponent;
  let fixture: ComponentFixture<PhoneCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhoneCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhoneCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
