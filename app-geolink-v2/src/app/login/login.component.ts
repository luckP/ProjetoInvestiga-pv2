import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {Router} from '@angular/router';

import { AuthService } from '../auth.service';
import { User } from '../models/user';
import { AnalyticsService } from '../analytics/analytics.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( 
    private auth: AuthService,
    private router: Router,
    private analytics: AnalyticsService
    ) { }

  ngOnInit() {
  }

  public login():void{
    let user:User = {
      id: 0,
      name: '',
      email: this.emailFormControl.value,
      password: this.passwordFormControl.value,
      status: 0
    }
    
    if(this.emailFormControl.status == 'VALID' && this.passwordFormControl.status == 'VALID'){
      this.auth.login(user)
        .subscribe(
          resp => {

            console.log(resp);
            if(resp == null){
              console.error("resp: "+ resp); 
            }
            else{ 
              user.id = parseInt(resp.user.id)
              user.name = resp.user.name;
              user.password = resp.user.password;
              
              this.auth.setUser(user);
              // this.analytics.setAnalyticsList(resp.analyticsList);
              this.router.navigate(['/dashboard/'+user.id]);
            }
          },
          err => console.error(err)
          );
      }
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
  ]);

  matcher = new MyErrorStateMatcher();
  matcher2 = new MyErrorStateMatcher();


}
