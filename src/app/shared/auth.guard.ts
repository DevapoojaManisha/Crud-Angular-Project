import {
  CanActivateFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean | Promise<boolean> => {
  const authService: AuthService = inject(AuthService); 
  const router: Router = inject(Router);

  return authService.isAuthenticated().then((authenticated: boolean) => {
    if (authenticated) {
      return true;
    } else {
      router.navigate(['/'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  });
};

