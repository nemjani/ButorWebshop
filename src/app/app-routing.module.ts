import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminAuthGuard, authGuard } from './shared/services/auth.guard';

//ez itt a lazy loading
const routes: Routes = [
  {
    path: 'main', 
    loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule) 
  },
  {
    path: 'contact', 
    loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactModule) 
  },
  {
    path: 'product', 
    loadChildren: () => import('./pages/product/product.module').then(m => m.ProductModule),
  },
  { 
    path: 'not-found', 
    loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule) 
  },
  {
    path: '',
    redirectTo: '/main',
    pathMatch: 'full'
  },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  { path: 'signup', loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupModule) },
  { 
    path: 'rating', 
    loadChildren: () => import('./pages/rating/rating.module').then(m => m.RatingModule), 
    canActivate: [authGuard]
  },
  { 
    path: 'admin', 
    loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule),
    canActivate: [adminAuthGuard] 
  },
  {
    path: '**',
    redirectTo: '/not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
