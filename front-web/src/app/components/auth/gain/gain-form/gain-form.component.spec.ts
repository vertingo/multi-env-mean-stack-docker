import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GainFormComponent } from './gain-form.component';

describe('GainFormComponent', () => {
  let component: GainFormComponent;
  let fixture: ComponentFixture<GainFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GainFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GainFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
