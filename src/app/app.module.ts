import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbButtonModule, NbCardModule, NbContextMenuModule, NbLayoutModule, NbListModule, NbMenuModule, NbPopoverModule, NbThemeModule } from '@nebular/theme';
import { environment } from 'src/environments/environment';
import { AnalysisComponent } from './analysis/analysis.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompetitionComponent } from './competition/competition.component';
import { LoginComponent } from './login/login.component';
import { MainBackgroundComponent } from './main-background/main-background.component';
import { OverviewComponent } from './overview/overview.component';
import { RegistrationComponent } from './registration/registration.component';
import { TrainingComponent } from './training/training.component';
import {TrainingoverviewComponent} from './trainingoverview/trainingoverview.component';
import { CompetitionOverviewComponent } from './competition-overview/competition-overview.component';
import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    OverviewComponent,
    TrainingComponent,
    CompetitionComponent,
    AnalysisComponent,
    MainBackgroundComponent,
    TrainingoverviewComponent,
    CompetitionOverviewComponent,
    PageNotFoundComponentComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent },
      { path: 'login', component: LoginComponent },
      { path: 'registration', component: RegistrationComponent },
      { path: 'main', component: MainBackgroundComponent },
      { path: 'main/competition', component: CompetitionComponent },
      { path: 'main/overview', component: OverviewComponent },
      { path: 'main/training', component: TrainingComponent },
      { path: 'main/analysis', component: AnalysisComponent },
      { path: 'main/trainingoverview', component: TrainingoverviewComponent},
      { path: 'main/competitionoverview', component: CompetitionOverviewComponent },
      { path: '**', component: PageNotFoundComponentComponent },

    ]),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireAnalyticsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbContextMenuModule,
    NbMenuModule.forRoot(),
    NbCardModule,
    NbButtonModule,
    NbListModule,
    NbPopoverModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
