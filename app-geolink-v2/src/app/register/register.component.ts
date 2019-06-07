import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {AuthService } from '../auth.service';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public name:string;
  public email:string;
  public password:string;
  public confPassword:string;

  constructor( 
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    ) { }

  ngOnInit() {
    
  }

  public onRegister():void{ 
    
    if(this.name && this.email && this.password && (this.password === this.confPassword)){
      let user: User = {
        id: 0,
        name: this.name,
        email: this.email,
        password: this.password,
        status: 0
      }

      // console.log('ok');
      this.auth.register(user)
        .subscribe(
          resp => {
            console.log(resp);
            this.snackBar.open('Register', ('Success'), {
              duration: 2000,
            });
            this.router.navigate(['/login']);

          },
          err => console.error('err')
        );
    }
  }


  // error messagens
  nameFormControl = new FormControl('', [
    Validators.required,
  ]);

// error messagens
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
  ]);

  confirmPasswordFormControl = new FormControl('', [
    // falta fazer o match
    Validators.required
  ]);

  matcher = new MyErrorStateMatcher();

}
