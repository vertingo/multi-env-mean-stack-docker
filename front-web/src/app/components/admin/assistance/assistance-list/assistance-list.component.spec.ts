import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistanceListComponent } from './assistance-list.component';

describe('AssistanceListComponent', () => {
  let component: AssistanceListComponent;
  let fixture: ComponentFixture<AssistanceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssistanceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistanceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
