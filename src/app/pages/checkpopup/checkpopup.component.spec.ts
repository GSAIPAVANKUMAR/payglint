import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckpopupComponent } from './checkpopup.component';

describe('CheckpopupComponent', () => {
  let component: CheckpopupComponent;
  let fixture: ComponentFixture<CheckpopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckpopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
