import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit, AfterViewInit {

@Input() currentPage: string = '';
@Output() selectedPage: EventEmitter<string> = new EventEmitter();
@Output() onCloseSidenav: EventEmitter<boolean> = new EventEmitter<boolean>();

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

  close() {
    this.onCloseSidenav.emit(true);
  }
}
