import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MapComponent } from './map/map.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { AnalyticsControllerComponent } from './analytics/analytics-controller/analytics-controller.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard/:dashboard_id', component: DashboardComponent },
  { path: 'map', component: MapComponent },
  { path: 'analytics/:analytics_id', component: AnalyticsComponent },
  { path: 'analytics-controller', component: AnalyticsControllerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
