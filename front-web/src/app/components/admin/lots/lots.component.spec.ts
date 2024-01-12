import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LotsComponent } from './lots.component';

describe('LotsComponent', () => {
  let component: LotsComponent;
  let fixture: ComponentFixture<LotsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LotsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
