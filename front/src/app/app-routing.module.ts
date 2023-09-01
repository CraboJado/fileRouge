import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DepartementsComponent} from "./component/pages/departements/departements.component";
import {JoursOffComponent} from "./component/pages/jours-off/jours-off.component";
import {LoginComponent} from "./component/pages/login/login.component";
import {NotFoundComponent} from "./component/pages/not-found/not-found.component";
import {ValidationAbsComponent} from "./component/pages/validation-abs/validation-abs.component";
import {DemandeAbsComponent} from "./component/pages/demande-abs/demande-abs.component";
import {HomeComponent} from "./component/pages/home/home.component";
import {RapportsComponent} from "./component/pages/rapports/rapports.component";
import {RapportsVueOneComponent} from "./component/pages/rapports-vue-one/rapports-vue-one.component";
import {RapportsVueTwoComponent} from "./component/pages/rapports-vue-two/rapports-vue-two.component";

const routes: Routes = [
  { path: 'login',component : LoginComponent},
  { path: 'home',component : HomeComponent},
  { path: 'demandeAbs',component : DemandeAbsComponent},
  { path: 'validationAbs',component : ValidationAbsComponent},
  { path: 'rapports',component : RapportsComponent ,
    children:[
      {
        path:"vueOne",
        component:RapportsVueOneComponent
      },
      {
        path:"vueTwo",
        component:RapportsVueTwoComponent

      },
    ]
  },
  { path: 'departements',component : DepartementsComponent},
  { path: 'joursOff',component : JoursOffComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**',component : NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
