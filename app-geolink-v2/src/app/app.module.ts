import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { NavBarComponent } from './side-bar/nav-bar/nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MapAddPolygonDialogComponent } from './map/map-add-polygon-dialog/map-add-polygon-dialog.component';
import { MapEditPolygonDialogComponent } from './map/map-edit-polygon-dialog/map-edit-polygon-dialog.component';
import { MapDeletePolygonDialogComponent } from './map/map-delete-polygon-dialog/map-delete-polygon-dialog.component';
import { AnalyticsAddComponent } from './analytics/analytics-add/analytics-add.component';
import { AnalyticsChartAddComponent } from './analytics/analytics-chart-add/analytics-chart-add.component';

// charts
import { ChartsModule } from 'ng2-charts';

// angular materias
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { LoadingComponent } from './loading/loading.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { TopBarComponent } from './top-bar/top-bar.component';
import { MatTreeModule } from '@angular/material/tree';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChartLineBarComponent } from './chart-line-bar/chart-line-bar.component';
import { MatSelectModule } from '@angular/material/select';
import { MapComponent } from './map/map.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ChartCardComponent } from './chart-card/chart-card.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AnalyticsComponent } from './analytics/analytics.component';
import { DashboardBoxLegendComponent } from './dashboard/dashboard-box-legend/dashboard-box-legend.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { DashboardLineComponent } from './dashboard/dashboard-line/dashboard-line.component';
import { DashboardDoughnutComponent } from './dashboard/dashboard-doughnut/dashboard-doughnut.component';
import { DashboardRadarComponent } from './dashboard/dashboard-radar/dashboard-radar.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { SideBarComponent } from './side-bar/side-bar.component';
import { ProfileComponent } from './side-bar/profile/profile.component';
import { SideBarFooterComponent } from './side-bar/side-bar-footer/side-bar-footer.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavBarComponent,
    LoadingComponent,
    TopBarComponent,
    DashboardComponent,
    ChartLineBarComponent,
    MapComponent,
    ChartCardComponent,
    AnalyticsComponent,
    DashboardBoxLegendComponent,
    DashboardLineComponent,
    DashboardDoughnutComponent,
    DashboardRadarComponent,
    SideBarComponent,
    ProfileComponent,
    SideBarFooterComponent,
    MapAddPolygonDialogComponent,
    MapEditPolygonDialogComponent,
    MapDeletePolygonDialogComponent,
    AnalyticsAddComponent,
    AnalyticsChartAddComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTreeModule,
    ChartsModule,
    MatSelectModule,
    MatMenuModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatGridListModule,
    MatExpansionModule,
    MatBadgeModule,
    MatDividerModule,
    MatListModule
  ],
  providers: [
  ],
  entryComponents: [
    MapAddPolygonDialogComponent,
    MapEditPolygonDialogComponent,
    MapDeletePolygonDialogComponent,
    AnalyticsAddComponent,
    AnalyticsChartAddComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
