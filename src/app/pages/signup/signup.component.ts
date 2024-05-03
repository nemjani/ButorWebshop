import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  signUpForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    rePassword: new FormControl(''),
    name: new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl('')
    })
  });

  constructor(private location: Location, private authService: AuthService, private router: Router) {}

  onSubmit() {
    console.log(this.signUpForm.value);
    this.authService.singup(this.signUpForm.get('email')?.value!, this.signUpForm.get('password')?.value!).then(cred => {
      console.log(cred);
    }).catch(error => {
      console.error(error);      
    });
  }

  // goBack() {
  //   this.router.navigateByUrl('/login');
  // }

}
