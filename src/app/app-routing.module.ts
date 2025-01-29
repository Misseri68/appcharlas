import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DetalleCharlaComponent } from './components/detalle-charla/detalle-charla.component';
import { CrearCharlaComponent } from './components/crear-charla/crear-charla.component';
import { CursosComponent } from './components/cursos/cursos.component';
import { RondasComponent } from './components/rondas/rondas.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    // data: { animation: 'DashboardPage' }
  },
  {
    path: 'perfil',
    component: PerfilComponent,
    // data: { animation: 'PerfilPage' }

  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'detalle-charla/:id',
    component: DetalleCharlaComponent
  },
  {
    path: 'crear-charla',
    component: CrearCharlaComponent
  },
  {
    path: 'cursos',
    component: CursosComponent
  },
  {
    path: 'rondas',
    component: RondasComponent
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  },


];

