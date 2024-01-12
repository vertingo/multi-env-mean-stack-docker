
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr');
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FlexLayoutModule } from "@angular/flex-layout";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

//components
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { StatisticComponent } from './components/admin/statistic/statistic.component';
import { AlertMessageComponent } from './components/shared/alert-message/alert-message.component';
import { RegisterComponent } from './components/register/register.component';
import { ContactComponent } from './components/shared/contact/contact.component';
import { MapComponent } from './components/shared/contact/map/map.component';
import { FormulaireComponent } from './components/shared/contact/formulaire/formulaire.component';
import { InformationComponent } from './components/shared/contact/information/information.component';
import { UsersComponent } from './components/admin/users/users.component';
import { UsersListComponent } from './components/admin/users/users-list/users-list.component';
import { UsersDetailsComponent } from './components/admin/users/users-details/users-details.component';
import { UsersEditComponent } from './components/admin/users/users-edit/users-edit.component';
import { UsersDeleteComponent } from './components/admin/users/users-delete/users-delete.component';
import { ConfirmComponent } from './components/shared/contact/formulaire/confirm/confirm.component';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { GainComponent } from './components/auth/gain/gain.component';
import { GainListComponent } from './components/auth/gain/gain-list/gain-list.component';
import { GainFormComponent } from './components/auth/gain/gain-form/gain-form.component';
import { MentionsLegalesComponent } from './components/shared/mentions-legales/mentions-legales.component';
import { PolitiqueConfidentialiteComponent } from './components/shared/politique-confidentialite/politique-confidentialite.component';
import { CguComponent } from './components/shared/cgu/cgu.component';
import { UsersFormComponent } from './components/admin/users/users-form/users-form.component';
import { EmailingComponent } from './components/admin/emailing/emailing.component';
import { ProfilComponent } from './components/auth/profil/profil.component';
import { EmailFormComponent } from './components/admin/emailing/email-form/email-form.component';
import { LotsComponent } from './components/admin/lots/lots.component';
import { EditProfilInfoConnexionComponent } from './components/auth/profil/edit-profil-info-connexion/edit-profil-info-connexion.component';
import { EditProfilInfoUserComponent } from './components/auth/profil/edit-profil-info-user/edit-profil-info-user.component';
import { AssistanceComponent } from './components/admin/assistance/assistance.component';
import { AssistanceListComponent } from './components/admin/assistance/assistance-list/assistance-list.component';
import { UsersBloqueComponent } from './components/admin/users/users-bloque/users-bloque.component';
import { LostPasswordComponent } from './components/login/lost-password/lost-password.component';
import { ResetPasswordComponent } from './components/login/reset-password/reset-password.component';
import { ConfirmMessageComponent } from './components/shared/confirm-message/confirm-message.component';
import { ResponseContactComponent } from './components/admin/assistance/response-contact/response-contact.component';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    StatisticComponent,
    LoginComponent,
    AlertMessageComponent,
    RegisterComponent,
    ContactComponent,
    MapComponent,
    FormulaireComponent,
    InformationComponent,
    UsersComponent,
    UsersListComponent,
    UsersDetailsComponent,
    UsersEditComponent,
    UsersDeleteComponent,
    ConfirmComponent,
    NotFoundComponent,
    HomeComponent,
    GainComponent,
    GainListComponent,
    GainFormComponent,
    MentionsLegalesComponent,
    PolitiqueConfidentialiteComponent,
    CguComponent,
    UsersFormComponent,
    EmailingComponent,
    ProfilComponent,
    EmailFormComponent,
    LotsComponent,
    EditProfilInfoConnexionComponent,
    EditProfilInfoUserComponent,
    AssistanceComponent,
    AssistanceListComponent,
    ResponseContactComponent,
    UsersBloqueComponent,
    LostPasswordComponent,
    ResetPasswordComponent,
    ConfirmMessageComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule,
    ChartsModule,
    FormsModule,
    ReactiveFormsModule,
    SatDatepickerModule, 
    SatNativeDateModule,

  ],
  providers: [ 
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'fr-FR' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
