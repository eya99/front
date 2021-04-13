import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumlistComponent } from './forumlist.component';

describe('ForumlistComponent', () => {
  let component: ForumlistComponent;
  let fixture: ComponentFixture<ForumlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForumlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForumlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
