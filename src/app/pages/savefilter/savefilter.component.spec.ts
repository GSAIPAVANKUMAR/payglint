import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavefilterComponent } from './savefilter.component';

describe('SavefilterComponent', () => {
  let component: SavefilterComponent;
  let fixture: ComponentFixture<SavefilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavefilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavefilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
