import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/pages/login/login.component';

import { DepartementsComponent } from './component/pages/departements/departements.component';
import { JoursOffComponent } from './component/pages/jours-off/jours-off.component';
import { EmployesComponent } from './component/pages/employes/employes.component';
import { AbsencesComponent } from './component/pages/absences/absences.component';
import { NotFoundComponent } from './component/pages/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
    DepartementsComponent,
    JoursOffComponent,
    EmployesComponent,
    AbsencesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
