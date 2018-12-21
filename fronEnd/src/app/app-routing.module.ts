import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FeaturesComponent} from "./components/features/features.component";
import {SearchComponent} from "./components/search/search.component";
import {ApplicantComponent} from "./components/applicant/applicant.component";
import {Component3Component} from "./components/component3/component3.component";
import {StoreComponent} from "./components/store/store.component";

const routes: Routes = [
  {path: '', component: SearchComponent},
  {path: 'feature/:pid', component: FeaturesComponent},
  {path: 'applicant', component: ApplicantComponent},
  {path: 'component3', component: Component3Component},
  {path: 'store', component: StoreComponent},

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
