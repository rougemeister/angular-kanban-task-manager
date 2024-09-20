import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { BoardEffects } from './store/effects/boards.effects';
import { boardReducer } from './store/reducers/boards.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideClientHydration(), 
    provideStore(), 
    provideState({name:'boards', reducer: boardReducer}),
    provideEffects([BoardEffects]), 
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }), provideHttpClient(withFetch())]
};
