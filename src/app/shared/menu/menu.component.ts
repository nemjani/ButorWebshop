import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit, AfterViewInit {

@Input() currentPage: string = '';
@Input() loggedInUser?: firebase.default.User | null;
@Output() selectedPage: EventEmitter<string> = new EventEmitter();
@Output() onCloseSidenav: EventEmitter<boolean> = new EventEmitter<boolean>();
@Output() onLogout: EventEmitter<boolean> = new EventEmitter();

  constructor() {
    console.log("constructor called.");
  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    
  }                           //ez csak példa az életciklus fgv-vel de nem ide kell majd
  
  menuSwitch() {
    this.selectedPage.emit(this.currentPage);
  }

  close(logout?: boolean) {
    this.onCloseSidenav.emit(true);
    if (logout === true) {
      this.onLogout.emit(logout);
    }
  }
}
