import { ApplicationConfig } from '@angular/core';
import { APP_ROUTES } from './routes/routes';
import { provideRouter } from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(APP_ROUTES),
  ]
};
