//?  In this revised code, sessionStorage is accessed only if the platform is a browser.
//?  This is also done to prevent the server-side rendering from accessing sessionStorage.
//? This is because sessionStorage is not available on the server-side.
//?  Causing ReferenceError: sessionStorage is not defined.
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const platformId = inject(PLATFORM_ID);
  const router = inject(Router);

  if (isPlatformBrowser(platformId)) {
    const authToken = sessionStorage.getItem('authToken');

    if (!authToken) {
      return router.createUrlTree(['/register']);
    } else {
      return true;
    }
  } else {
    // Handle server-side rendering case or redirect as appropriate
    return router.createUrlTree(['/register']);
  }
};

// export const authGuard: CanActivateFn = (route, state) => {
//   const router = inject(Router);
//   const userEmail = sessionStorage.getItem('userEmail');

//   if (!userEmail) {
//     return router.createUrlTree(['/register']);
//   } else {
//     return true;
//   }
// };
