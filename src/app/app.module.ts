import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import {NgbCollapseModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from "@angular/common/http";
import { FullCalendarModule } from '@fullcalendar/angular';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/pages/login/login.component';
import { CalendrierComponent } from './components/pages/calendrier/calendrier.component';
import { JoursOffComponent } from './components/pages/jours-off/jours-off.component';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { ValidationAbsComponent } from './components/pages/validation-abs/validation-abs.component';
import { DemandeAbsComponent } from './components/pages/demande-abs/demande-abs.component';
import { RapportsComponent } from './components/pages/rapports/rapports.component';
import { RapportsVueOneComponent } from './components/pages/rapports-vue-one/rapports-vue-one.component';
import { RapportsVueTwoComponent } from './components/pages/rapports-vue-two/rapports-vue-two.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainNavComponent } from './components/header/main-nav/main-nav.component';
import { FormComponent } from './components/form/form.component';
import {DatePipe} from "@angular/common";
import { NgChartsModule } from 'ng2-charts';
import {DateAdapter} from "@angular/material/core";
import {MainNavComponent} from "./components/header/main-nav/main-nav.component";
import {HomeComponent} from "./components/pages/home/home.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
    CalendrierComponent,
    JoursOffComponent,
    ValidationAbsComponent,
    DemandeAbsComponent,
    RapportsComponent,
    RapportsVueOneComponent,
    RapportsVueTwoComponent,
    HeaderComponent,
    FooterComponent,
    MainNavComponent,
    FormComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    NgbCollapseModule,
    FormsModule,
    FullCalendarModule,
    DatePipe,
    NgChartsModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
