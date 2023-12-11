import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthComponent } from './components/auth/auth.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home' },
  { path: 'login', component: AuthComponent, title: 'Login' },
  { path: 'register', component: RegisterComponent, title: 'Register' },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
