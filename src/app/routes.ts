import {AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo} from '@angular/fire/auth-guard';
import { Routes } from '@angular/router';
import { AnalysisComponent } from './analysis/analysis.component';
import { CompetitionOverviewComponent } from './competition-overview/competition-overview.component';
import { CompetitionComponent } from './competition/competition.component';
import { LoginComponent } from './login/login.component';
import { OverviewComponent } from './overview/overview.component';
import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';
import { RegistrationComponent } from './registration/registration.component';
import { TrainingComponent } from './training/training.component';
import { TrainingoverviewComponent } from './trainingoverview/trainingoverview.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login'])

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: '', component: OverviewComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },
  { path: 'training', component: TrainingComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },
  { path: 'trainingoverview', component: TrainingoverviewComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },
  { path: 'competition', component: CompetitionComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },
  { path: 'competitionoverview', component: CompetitionOverviewComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },
  { path: 'analysis/:id', component: AnalysisComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },
  { path: '**', component: PageNotFoundComponentComponent },
]