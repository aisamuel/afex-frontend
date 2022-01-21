import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiphyListCardComponent } from './giphy-list-card.component';

describe('GiphyListCardComponent', () => {
  let component: GiphyListCardComponent;
  let fixture: ComponentFixture<GiphyListCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiphyListCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GiphyListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
