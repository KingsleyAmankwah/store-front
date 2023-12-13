import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthComponent } from './components/auth/auth.component';
import { BusinessSignUpComponent } from './components/business-sign-up/business-sign-up.component';
import { IndividualSignUpComponent } from './components/individual-sign-up/individual-sign-up.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home' },
  { path: 'login', component: AuthComponent, title: 'Login' },
  {
    path: 'sign-up',
    component: BusinessSignUpComponent,
    title: 'Business Account',
  },
  {
    path: 'register',
    component: IndividualSignUpComponent,
    title: 'Individual Account',
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
