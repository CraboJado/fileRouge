import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {JoursOffComponent} from "./components/pages/jours-off/jours-off.component";
import {LoginComponent} from "./components/pages/login/login.component";
import {NotFoundComponent} from "./components/pages/not-found/not-found.component";
import {ValidationAbsComponent} from "./components/pages/validation-abs/validation-abs.component";
import {DemandeAbsComponent} from "./components/pages/demande-abs/demande-abs.component";
import {RapportsComponent} from "./components/pages/rapports/rapports.component";
import {RapportsVueOneComponent} from "./components/pages/rapports-vue-one/rapports-vue-one.component";
import {RapportsVueTwoComponent} from "./components/pages/rapports-vue-two/rapports-vue-two.component";
import {CalendrierComponent} from "./components/pages/calendrier/calendrier.component";

import {HomeComponent} from "./components/pages/home/home.component";
import {authGuard} from "./auth/auth.guard";
import {roleGuard} from "./auth/role.guard";
import {SharedLayoutComponent} from "./components/layout/shared-layout/shared-layout.component";

const routes: Routes = [
  { path: 'login',component : LoginComponent},


  {path:"", component:SharedLayoutComponent,
    children:[
  { path: 'home',component : HomeComponent, canActivate:[authGuard]},
  { path: 'calendrier',component : CalendrierComponent,canActivate:[authGuard]},
  { path: 'demande',component : DemandeAbsComponent,canActivate:[authGuard]},
  { path: 'validation',
    component : ValidationAbsComponent,
    canActivate:[authGuard,roleGuard],
    data:{roles:'MANAGER'}
  },
  { path: 'rapports',
    component : RapportsComponent,
    canActivate:[authGuard,roleGuard],
    data:{roles:'MANAGER'},
    children:[
      {
        path:"",
        redirectTo:'histogramme',
        pathMatch: 'full'
      },
      {
        path:"histogramme",
        component:RapportsVueOneComponent
      },
      {
        path:"tableau",
        component:RapportsVueTwoComponent
      },
    ],

  },
  { path: 'jours-off',
    component : JoursOffComponent,
    canActivate:[authGuard,roleGuard],
    data:{roles:'ADMIN'},
  }]},
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: '**',component : NotFoundComponent ,canActivate:[authGuard]}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
