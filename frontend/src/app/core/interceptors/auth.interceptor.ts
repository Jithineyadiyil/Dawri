import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Attaches Bearer token to requests.
 * Redirects to /auth on 401 — but NEVER triggers logout loop.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth   = inject(AuthService);
  const router = inject(Router);
  const token  = auth.getToken();

  // Skip auth header for login/register requests
  const isAuthEndpoint = req.url.includes('/auth/login')
    || req.url.includes('/auth/register')
    || req.url.includes('/auth/otp');

  const authReq = token && !isAuthEndpoint
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(authReq).pipe(
    catchError(err => {
      // Only redirect on 401, and NEVER if we're already calling logout
      if (err.status === 401 && !req.url.includes('/auth/logout')) {
        // Clear local state without making another API call
        auth.clearLocal();
        router.navigate(['/auth']);
      }
      return throwError(() => err);
    }),
  );
};
