import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "./auth.service";

export const roleGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);

  const router = inject(Router);

  let isAuthorized = authService.roles?.includes(route.data['roles']);

  if(isAuthorized){
    return true;
  }
  // Redirect to the home page for other roles
  return router.parseUrl('/home');
};
