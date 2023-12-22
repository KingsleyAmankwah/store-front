import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthComponent } from './components/auth/auth.component';
import { BusinessSignUpComponent } from './components/business-sign-up/business-sign-up.component';
import { IndividualSignUpComponent } from './components/individual-sign-up/individual-sign-up.component';
import { EmailVerificationPageComponent } from './components/email-verification-page/email-verification-page.component';
import { ResetPasswordPageComponent } from './components/reset-password-page/reset-password-page.component';
import { ChangePasswordPageComponent } from './components/change-password-page/change-password-page.component';
import { authGuard } from './guards/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardMainContentComponent } from './components/dashboard-main-content/dashboard-main-content.component';
import { SupportComponent } from './components/support/support.component';
import { ProjectComponent } from './components/project/project.component';

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

  {
    path: 'verify-email',
    component: EmailVerificationPageComponent,
    title: 'Verify Email',
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: DashboardMainContentComponent,
      },
      { path: 'profile', component: ProfileComponent },
      { path: 'projects', component: ProjectComponent },
      { path: 'support', component: SupportComponent },
    ],
    title: 'Dashboard',
  },

  {
    path: 'reset-password',
    component: ResetPasswordPageComponent,
    title: 'Reset Password',
  },
  {
    path: 'change-password',
    component: ChangePasswordPageComponent,
    title: 'New Password',
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
