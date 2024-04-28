import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  page = '';

  routes: Array<string> = [];

  constructor(private router: Router) {
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
  }

  changePage(selectedPage: string) {
    // this.page = selectedPage;
    this.router.navigateByUrl(selectedPage);
  }
}
