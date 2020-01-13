import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginModule } from './login/login.module';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DatageneratorComponent } from './datagenerator/datagenerator.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const appRoutes: Routes = [
    // {
    //     path: '',
    //     redirectTo: '/login',
    //     pathMatch: 'full'
    // },
    {
        path: '',
        // redirectTo: 'login',
        component: LoginComponent,
        pathMatch: 'full'
        // children: [{
        //     path: '',
        //     loadChildren: './login/login.module#LoginModule'
        // }]
    },
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

export default appRoutes;