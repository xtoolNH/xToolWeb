import {RouterModule, Routes} from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterUserComponent } from './register-user/register-user.component';

const Routes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'auth/login', component: LoginComponent },
    {path: 'auth/register', component: RegisterUserComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(Routes)],
    exports: [RouterModule]
  })

  export class AppRoutingModule { }
