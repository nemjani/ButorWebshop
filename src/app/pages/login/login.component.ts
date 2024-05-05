import { Component, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FakeLoadingService } from '../../shared/services/fake-loading.service';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {

  email = new FormControl('', [Validators.required, Validators.email]); // Email validátor hozzáadva

  password = new FormControl('', Validators.required);

  loading: boolean = false;
  loadingSubscription: any;

  constructor(private router: Router, private loadingService: FakeLoadingService, private authService: AuthService) { }

  async login() {
    if (this.email.valid && this.password.valid) {
      this.loading = true;
      if (this.email.value && this.password.value) {
        this.authService.login(this.email.value, this.password.value)
          .then(cred => {
            console.log(cred);
            this.router.navigateByUrl('/main');
            this.loading = false;
          })
          .catch(error => {
            //console.error(error);
            this.loading = false;
            let errorMessage = 'Hibás e-mail vagy jelszó!';
            if (error.code === 'auth/user-not-found') {
              errorMessage = 'Nem létező e-mail cím vagy hibás jelszó!';
            } else if (error.code === 'auth/wrong-password') {
              errorMessage = 'Hibás jelszó!';
            }
            alert(errorMessage);
          });
      }
    } else {
      this.loading = false;
      if (this.email.hasError('email')) {
        alert('Érvénytelen e-mail formátum!');
      } else {
        alert('Minden mező kitöltése kötelező és érvényes e-mail formátumra van szükség!');
      }
    }
  }

  ngOnDestroy() {
    this.loadingSubscription?.unsubscribe();
  }
}
