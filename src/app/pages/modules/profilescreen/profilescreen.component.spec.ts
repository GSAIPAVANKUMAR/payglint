import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilescreenComponent } from './profilescreen.component';

describe('ProfilescreenComponent', () => {
  let component: ProfilescreenComponent;
  let fixture: ComponentFixture<ProfilescreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilescreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilescreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
