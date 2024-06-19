import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { customerReducer } from './store/reducer';
import { provideEffects } from '@ngrx/effects';
import { CustomerEffects } from './store/effects';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideStore({ customers: customerReducer
        //auth: authReducer  || if i had multiple reducers i would put them in this obj
    }), provideEffects([CustomerEffects])]
};
