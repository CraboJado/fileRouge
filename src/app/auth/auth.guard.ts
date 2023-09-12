import { CanActivateFn } from '@angular/router';
import {inject} from '@angular/core';
import { Router } from '@angular/router';

import {AuthService} from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);

  const router = inject(Router);

  let roles = localStorage.getItem('roles');

  if (roles) {
    authService.roles =JSON.parse(roles as string);
    return true;
  }

  // Redirect to the login page
  return router.parseUrl('/login');

};
