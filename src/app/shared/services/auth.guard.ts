import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const user = JSON.parse(localStorage.getItem('user') as string);
  if (user) {
    return true;
  }
  return false;
};

export const adminAuthGuard: CanActivateFn = (route, state) => {
  const user = JSON.parse(localStorage.getItem('user') as string);
  if (user && user.email === 'admin@gmail.com') {
    return true;
  }
  return false;
};
