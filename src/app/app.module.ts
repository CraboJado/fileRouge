import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/pages/login/login.component';
import { CalendrierComponent } from './components/pages/calendrier/calendrier.component';
import { JoursOffComponent } from './components/pages/jours-off/jours-off.component';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { ValidationAbsComponent } from './components/pages/validation-abs/validation-abs.component';
import { DemandeAbsComponent } from './components/pages/demande-abs/demande-abs.component';
import { HomeComponent } from './components/pages/home/home.component';
import { RapportsComponent } from './components/pages/rapports/rapports.component';
import { RapportsVueOneComponent } from './components/pages/rapports-vue-one/rapports-vue-one.component';
import { RapportsVueTwoComponent } from './components/pages/rapports-vue-two/rapports-vue-two.component';
import {HttpClientModule} from "@angular/common/http";
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainNavComponent } from './components/header/main-nav/main-nav.component';
import { SubNavComponent } from './components/header/sub-nav/sub-nav.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { FormComponent } from './components/form/form.component';
import { FormsModule } from '@angular/forms';
import {DatePipe} from "@angular/common";
import { NgChartsModule } from 'ng2-charts';
import {DateAdapter} from "@angular/material/core";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
    CalendrierComponent,
    JoursOffComponent,
    ValidationAbsComponent,
    DemandeAbsComponent,
    HomeComponent,
    RapportsComponent,
    RapportsVueOneComponent,
    RapportsVueTwoComponent,
    HeaderComponent,
    FooterComponent,
    MainNavComponent,
    SubNavComponent
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
