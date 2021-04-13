import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconDashComponent } from './icon-dash.component';

describe('IconDashComponent', () => {
  let component: IconDashComponent;
  let fixture: ComponentFixture<IconDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
