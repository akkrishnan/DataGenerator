import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DatageneratorComponent } from './datagenerator/datagenerator.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const appRoutes: Routes = [
    {
        path: '',
        component: LoginComponent
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