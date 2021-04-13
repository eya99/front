import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplashDashComponent } from './splash-dash.component';

describe('SplashDashComponent', () => {
  let component: SplashDashComponent;
  let fixture: ComponentFixture<SplashDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SplashDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SplashDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
