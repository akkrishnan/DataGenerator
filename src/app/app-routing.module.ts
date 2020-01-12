import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DatageneratorComponent } from './datagenerator/datagenerator.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const appRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'datagen',
    component: DatageneratorComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  }
];

// @NgModule({
//   imports: [RouterModule.forRoot(appRoutes)],
//   exports: [RouterModule]
// })

export default appRoutes;
// export class AppRoutingModule { }
