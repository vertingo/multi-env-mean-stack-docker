import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfilInfoConnexionComponent } from './edit-profil-info-connexion.component';

describe('EditProfilInfoConnexionComponent', () => {
  let component: EditProfilInfoConnexionComponent;
  let fixture: ComponentFixture<EditProfilInfoConnexionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProfilInfoConnexionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfilInfoConnexionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
