import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfilInfoUserComponent } from './edit-profil-info-user.component';

describe('EditProfilInfoUserComponent', () => {
  let component: EditProfilInfoUserComponent;
  let fixture: ComponentFixture<EditProfilInfoUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProfilInfoUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfilInfoUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
