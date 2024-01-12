import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseContactComponent } from './response-contact.component';

describe('ResponseContactComponent', () => {
  let component: ResponseContactComponent;
  let fixture: ComponentFixture<ResponseContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponseContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponseContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
