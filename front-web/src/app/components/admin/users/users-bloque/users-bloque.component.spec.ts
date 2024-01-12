import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersBloqueComponent } from './users-bloque.component';

describe('UsersBloqueComponent', () => {
  let component: UsersBloqueComponent;
  let fixture: ComponentFixture<UsersBloqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersBloqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersBloqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
