import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../shared/models/User';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    rePassword: new FormControl('', Validators.required),
    name: new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required)
    })
  });

  constructor(private location: Location, private authService: AuthService, private router: Router, private userService: UserService) {}

  onSubmit() {
    if (this.signUpForm.valid) {
      const password = this.signUpForm.get('password')?.value;
      const rePassword = this.signUpForm.get('rePassword')?.value;

      if (password !== rePassword) {
        alert('A jelszavak nem egyeznek meg!');
        return;
      }

      console.log(this.signUpForm.value);
      this.authService.singup(this.signUpForm.get('email')?.value!, password!).then(cred => {
        console.log(cred);
        const user: User = {
          id: cred.user?.uid as string,
          email: this.signUpForm.get('email')?.value!,
          username: this.signUpForm.get('email')?.value?.split('@')[0]!,
          name: {
            firstName: this.signUpForm.get('name.firstName')?.value!,
            lastName: this.signUpForm.get('name.lastName')?.value!
          }
        };
        this.userService.create(user).then(_ => {
          console.log('User added successfully!');
          this.router.navigateByUrl('/main');
        }).catch(error => {
          //console.error(error);
        })
      }).catch(error => {
        //console.error(error);      
      });
    } else {
      alert('Kérlek töltsd ki az összes mezőt érvényes adatokkal!');
    }
  }
}
