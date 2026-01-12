import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = 'supermegasecrettoken';
  
  // Clone the request and add the Authentication header
  const authReq = req.clone({
    setHeaders: {
      Authentication: authToken
    }
  });

  return next(authReq);
};
