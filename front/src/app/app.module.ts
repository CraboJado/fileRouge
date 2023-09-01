import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/pages/login/login.component';

import { DepartementsComponent } from './component/pages/departements/departements.component';
import { JoursOffComponent } from './component/pages/jours-off/jours-off.component';
import { NotFoundComponent } from './component/pages/not-found/not-found.component';

import { ValidationAbsComponent } from './component/pages/validation-abs/validation-abs.component';
import { DemandeAbsComponent } from './component/pages/demande-abs/demande-abs.component';
import { HomeComponent } from './component/pages/home/home.component';
import { RapportsComponent } from './component/pages/rapports/rapports.component';
import { RapportsVueOneComponent } from './component/pages/rapports-vue-one/rapports-vue-one.component';
import { RapportsVueTwoComponent } from './component/pages/rapports-vue-two/rapports-vue-two.component';

import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
    DepartementsComponent,
    JoursOffComponent,
    ValidationAbsComponent,
    DemandeAbsComponent,
    HomeComponent,
    RapportsComponent,
    RapportsVueOneComponent,
    RapportsVueTwoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
