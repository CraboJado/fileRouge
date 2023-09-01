import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {JoursOffComponent} from "./components/pages/jours-off/jours-off.component";
import {LoginComponent} from "./components/pages/login/login.component";
import {NotFoundComponent} from "./components/pages/not-found/not-found.component";
import {ValidationAbsComponent} from "./components/pages/validation-abs/validation-abs.component";
import {DemandeAbsComponent} from "./components/pages/demande-abs/demande-abs.component";
import {HomeComponent} from "./components/pages/home/home.component";
import {RapportsComponent} from "./components/pages/rapports/rapports.component";
import {RapportsVueOneComponent} from "./components/pages/rapports-vue-one/rapports-vue-one.component";
import {RapportsVueTwoComponent} from "./components/pages/rapports-vue-two/rapports-vue-two.component";

const routes: Routes = [
  { path: 'login',component : LoginComponent},
  { path: 'home',component : HomeComponent},
  { path: 'demande',component : DemandeAbsComponent},
  { path: 'validation',component : ValidationAbsComponent},
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
  { path: 'jours-off',component : JoursOffComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**',component : NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
