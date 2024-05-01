import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './shared/menu/menu.component';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatListModule } from '@angular/material/list';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire/compat';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    MatListModule,
    AngularFireModule.initializeApp({"projectId":"webfelj-2024","appId":"1:706807743490:web:96873cbddedb03c561d31b","storageBucket":"webfelj-2024.appspot.com","apiKey":"AIzaSyAFTSfW7aJlqEL_EorN6KZXjbIy2O_wd6M","authDomain":"webfelj-2024.firebaseapp.com","messagingSenderId":"706807743490"}),
    //provideFirebaseApp(() => initializeApp({"projectId":"webfelj-2024","appId":"1:706807743490:web:96873cbddedb03c561d31b","storageBucket":"webfelj-2024.appspot.com","apiKey":"AIzaSyAFTSfW7aJlqEL_EorN6KZXjbIy2O_wd6M","authDomain":"webfelj-2024.firebaseapp.com","messagingSenderId":"706807743490"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
