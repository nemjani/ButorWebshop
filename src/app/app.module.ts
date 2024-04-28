import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { MainComponent } from './pages/main/main.component';
//import { ProductComponent } from './pages/product/product.component';
//import { ContactComponent } from './pages/contact/contact.component';
import { MenuComponent } from './shared/menu/menu.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    //MainComponent,
    // ProductComponent,
    //ContactComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
