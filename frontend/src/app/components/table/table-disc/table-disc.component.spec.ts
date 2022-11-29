import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDiscComponent } from './table-disc.component';

describe('TableDiscComponent', () => {
  let component: TableDiscComponent;
  let fixture: ComponentFixture<TableDiscComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableDiscComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableDiscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
