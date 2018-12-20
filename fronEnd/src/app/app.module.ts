import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";
import { NgxSpinnerModule } from 'ngx-spinner';
import {FeatureService} from "./services/feature.service";
import {HttpClientModule} from "@angular/common/http";
import { FeaturesComponent } from './components/features/features.component';
import { SearchComponent } from './components/search/search.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ApplicantComponent} from "./components/applicant/applicant.component";

@NgModule({
  declarations: [
    AppComponent,
    FeaturesComponent,
    SearchComponent,
    ApplicantComponent
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
    MatPaginatorModule


  ],
  providers: [FeatureService],
  bootstrap: [AppComponent]
})
export class AppModule { }
