import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {
  NbButtonModule,
  NbCardModule,
  NbContextMenuModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbListModule,
  NbMenuModule,
  NbPopoverModule,
  NbSidebarModule,
  NbSpinnerModule,
  NbThemeModule,
} from '@nebular/theme';
import { ChartsModule } from 'ng2-charts';
import { environment } from 'src/environments/environment';
import { AnalysisComponent } from './analysis/analysis.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompetitionOverviewComponent } from './competition-overview/competition-overview.component';
import { CompetitionComponent } from './competition/competition.component';
import { CubeComponent } from './cube/cube.component';
import { LoginComponent } from './login/login.component';
import { OverviewComponent } from './overview/overview.component';
import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';
import { RegistrationComponent } from './registration/registration.component';
import { TrainingComponent } from './training/training.component';
import { TrainingoverviewComponent } from './trainingoverview/trainingoverview.component';
import { ApiService } from './api.service';
import { StatisticsService } from './statistics.service';
import { FormsModule } from '@angular/forms';
import { routes } from './routes'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    OverviewComponent,
    TrainingComponent,
    CompetitionComponent,
    AnalysisComponent,
    TrainingoverviewComponent,
    CompetitionOverviewComponent,
    PageNotFoundComponentComponent,
    CubeComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireAnalyticsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'dark' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbIconModule,
    NbContextMenuModule,
    NbCardModule,
    NbButtonModule,
    NbListModule,
    NbPopoverModule,
    ChartsModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbSpinnerModule,
    NbInputModule,
    NbFormFieldModule,
    FormsModule
  ],
  providers: [ApiService, StatisticsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
