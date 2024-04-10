import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth/shared/auth.service';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService);
  let toatrService = inject(ToastrService);
  if (authService.isLoggedIn()) {
    return true;
  }
  toatrService.error("Please login to continue");
  return false;
};
