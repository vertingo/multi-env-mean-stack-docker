import { ResetPasswordComponent } from './components/login/reset-password/reset-password.component';
import { LostPasswordComponent } from './components/login/lost-password/lost-password.component';
import { AssistanceComponent } from './components/admin/assistance/assistance.component';
import { PolitiqueConfidentialiteComponent } from './components/shared/politique-confidentialite/politique-confidentialite.component';
import { MentionsLegalesComponent } from './components/shared/mentions-legales/mentions-legales.component';
import { CguComponent } from './components/shared/cgu/cgu.component';
import { EmailingComponent } from './components/admin/emailing/emailing.component';
import { StatisticComponent } from './components/admin/statistic/statistic.component';
import { ProfilComponent } from './components/auth/profil/profil.component';
import { GainComponent } from './components/auth/gain/gain.component';
import { UsersComponent } from './components/admin/users/users.component';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from 'src/app/components/login/login.component';
import { RegisterComponent } from 'src/app/components/register/register.component';
import { NavbarComponent } from 'src/app/components/shared/navbar/navbar.component';
import { ContactComponent } from 'src/app/components/shared/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'login/lost-password', component: LostPasswordComponent},
  { path: 'login/reset-password/:token', component: ResetPasswordComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'cgu', component: CguComponent},
  { path: 'mention-legales', component: MentionsLegalesComponent},
  { path: 'politique-de-confidentialite', component: PolitiqueConfidentialiteComponent},
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard],
  data: { roles: ['client'] } },
  { path: 'statistique', component: StatisticComponent },
  { path: 'emailing', component: EmailingComponent },
  { path: 'assistance', component: AssistanceComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'home', component: HomeComponent },
  { path: 'auth', component: GainComponent },
  { path: 'profil', component: ProfilComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
