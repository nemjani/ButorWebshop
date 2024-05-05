import { Component, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  page = '';

  routes: Array<string> = [];
  loggedInUser?: firebase.default.User | null;

  constructor(private router: Router, private authService: AuthService) {
    //paraméter adattag ,ugyanaz mintha a konstruktor fölött létrehoztam volna és a k.ban példányosítottam volna.
  }

  ngOnInit() {
    this.routes = this.router.config.map(conf => conf.path) as string[];

    //reaktív programozás -> Observable
    //feliratkozunk egy eseményre amit a pipe-al szűrünk
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((evts: any) => {
      //console.log(evts);
      const currentPage = (evts.urlAfterRedirects as string).split('/')[1] as string;
      if (this.routes.includes(currentPage)) {
        this.page = currentPage;
      }
    });
    this.authService.isUserLoggedIn().subscribe(user => {
      console.log(user);

      //itt baj van ha elmegyünk a regisztráláshoz és vissza akkor valami nem jó itt neki
      
      this.loggedInUser = user;
      localStorage.setItem('user', JSON.stringify(this.loggedInUser));
    }, error => {
      //console.error(error);
      localStorage.setItem('user', JSON.stringify(null) as string);
    });
  }

  changePage(selectedPage: string) {
    // this.page = selectedPage;
    this.router.navigateByUrl(selectedPage);
  }

  onToggleSidenav(sidenav: MatSidenav) {
    sidenav.toggle();
  }

  onClose(sidenav: MatSidenav) {
    sidenav.close();
  }

  logout(_?: boolean) {
    this.authService.logout().then(() => {
      console.log('Logged out successfully.');
    }).catch(error => {
      //console.error(error);
    });
  }
}

