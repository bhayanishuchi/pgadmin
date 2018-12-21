import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";
import { NgxSpinnerModule } from 'ngx-spinner';
import {FeatureService} from "./services/feature.service";
import {HttpClientModule} from "@angular/common/http";
import { FeaturesComponent } from './components/features/features.component';
import { SearchComponent } from './components/search/search.component';
import {MatTableModule} from '@angular/material/table';
import {
  MatFormFieldModule,
  MatInputModule,
  MatPaginatorModule,
  MatRadioModule
} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ApplicantComponent} from "./components/applicant/applicant.component";
import { Component3Component } from './components/component3/component3.component';
import { StoreComponent } from './components/store/store.component';

@NgModule({
  declarations: [
    AppComponent,
    FeaturesComponent,
    SearchComponent,
    ApplicantComponent,
    Component3Component,
    StoreComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    NgSelectModule,
    NgxSpinnerModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    ReactiveFormsModule,

  ],
  providers: [FeatureService],
  bootstrap: [AppComponent]
})
export class AppModule { }
