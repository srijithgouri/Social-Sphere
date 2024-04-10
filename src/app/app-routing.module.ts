import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { CreatePostComponent } from './post/create-post/create-post.component';
import { CreateSubredditComponent } from './subreddit/create-subreddit/create-subreddit.component';
import { authGuard } from './auth.guard';
import { ViewPostComponent } from './post/view-post/view-post.component';
import { AppMenuComponent } from './app-menu/app-menu.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { UserProfileComponent } from './auth/user-profile/user-profile.component';
import { ViewSubredditComponent } from './subreddit/view-subreddit/view-subreddit.component';
import { AdminComponent } from './admin/admin.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

const routes: Routes = [
  {path:"",   component: HomeComponent},
  { path: 'sign-up', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'about', component: AboutComponent},
  { path: 'edit', component: EditProfileComponent},
  { path: 'user', component: UserProfileComponent },
  { path: 'create-post', canActivate: [authGuard], component: CreatePostComponent},
  { path: 'view-post/:id', component: ViewPostComponent},
  { path: 'create-subreddit', canActivate: [authGuard], component: CreateSubredditComponent},
  { path: 'menu', component: AppMenuComponent},
  { path: 'view-subreddit/:id', component: ViewSubredditComponent},
  { path: 'forgotpassword', component: ForgotPasswordComponent},
  { path: 'resetpassword', component: ResetPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
