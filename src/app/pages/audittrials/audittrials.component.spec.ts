import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudittrialsComponent } from './audittrials.component';

describe('AudittrialsComponent', () => {
  let component: AudittrialsComponent;
  let fixture: ComponentFixture<AudittrialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AudittrialsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AudittrialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
