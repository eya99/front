import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailforumComponent } from './detailforum.component';

describe('DetailforumComponent', () => {
  let component: DetailforumComponent;
  let fixture: ComponentFixture<DetailforumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailforumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailforumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
