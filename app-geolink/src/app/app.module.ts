import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { HomeConfComponent } from './home-conf/home-conf.component';
import { MapComponent } from './map/map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component'; 
import { ChartsModule } from 'ng2-charts';
import { PieChartComponent } from './dashboard/charts/pie-chart/pie-chart.component';
import { PieDoughnutChartComponent } from './dashboard/charts/pie-doughnut-chart/pie-doughnut-chart.component';
import { RadarChartComponent } from './dashboard/charts/radar-chart/radar-chart.component';
import { ChartsBoxComponent } from './dashboard/charts/charts-box/charts-box.component';
import { LoadingComponent } from './loading/loading.component';
import { FooterComponent } from './footer/footer.component';
import { LineBarChartComponent } from './dashboard/charts/line-bar-chart/line-bar-chart.component';
import { LineBarChartInputsComponent } from './dashboard/charts/line-bar-chart-inputs/line-bar-chart-inputs.component'; 


// Materials
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MAT_DATE_LOCALE } from '@angular/material';
import {MatProgressBarModule} from '@angular/material/progress-bar';


// import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

// import 'angular-material-time-picker/dist/md-time-picker.css';
// import ngTimePicker from 'angular-material-time-picker';

import 'moment/locale/fr';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    HomeConfComponent,
    MapComponent,
    DashboardComponent,
    SidebarComponent,
    PieChartComponent,
    PieDoughnutChartComponent,
    RadarChartComponent,
    ChartsBoxComponent,
    LoadingComponent,
    FooterComponent,
    LineBarChartComponent,
    LineBarChartInputsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    LeafletModule.forRoot(),
    ChartsModule,
    BrowserAnimationsModule,
    MatButtonModule, MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatAutocompleteModule,
    MatProgressBarModule,
  ],
  providers: [
    // datepicker language
    { provide: MAT_DATE_LOCALE, useValue: 'pt-PT' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
