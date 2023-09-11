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
import {authGuard} from "./auth/auth.guard";

const routes: Routes = [
  { path: 'login',component : LoginComponent},
  { path: 'calendrier',component : CalendrierComponent},
  { path: 'demande',component : DemandeAbsComponent},
  { path: 'validation',component : ValidationAbsComponent},
  { path: 'rapports',component : RapportsComponent ,
    children:[
      {
        path:"vue-one",
        component:RapportsVueOneComponent
      },
      {
        path:"vue-two",
        component:RapportsVueTwoComponent

      },
    ]
  },
  { path: 'jours-off',component : JoursOffComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**',component : NotFoundComponent},
];


// const routes: Routes = [
//   { path: 'login',component : LoginComponent},
//   { path: 'home',component : HomeComponent, canActivate:[authGuard]},
//   { path: 'calendrier',component : CalendrierComponent,canActivate:[authGuard]},
//   { path: 'demande',component : DemandeAbsComponent,canActivate:[authGuard]},
//   { path: 'validation',component : ValidationAbsComponent,canActivate:[authGuard]},
//   { path: 'rapports',component : RapportsComponent ,
//     children:[
//       {
//         path:"vue-one",
//         component:RapportsVueOneComponent
//       },
//       {
//         path:"vue-two",
//         component:RapportsVueTwoComponent
//
//       },
//     ],
//     canActivate:[authGuard]
//   },
//   { path: 'jours-off',component : JoursOffComponent,canActivate:[authGuard]},
//   { path: '', redirectTo: 'login', pathMatch: 'full' },
//   { path: '**',component : NotFoundComponent},
// ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
