import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GragComponent } from './grag.component';

describe('GragComponent', () => {
  let component: GragComponent;
  let fixture: ComponentFixture<GragComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GragComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GragComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
