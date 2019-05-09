import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';

<<<<<<< HEAD

=======
>>>>>>> 35aad6439ad51dfefe2a473dfb2c05a54218594b
const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'

  },
  { path: 'login',
    component: LoginComponent  
  },
  {
    path: 'register',
    component: RegisterComponent
  },
    {
      path: 'home',
      component: HomeComponent
    },
    {
      path: 'dashboard',
      component: DashboardComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
