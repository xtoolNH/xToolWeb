import {RouterModule, Routes} from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';

const Routes: Routes = [
    { path: 'auth/login', component: DashboardComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(Routes)],
    exports: [RouterModule]
  })

  export class AppRoutingModule { }
