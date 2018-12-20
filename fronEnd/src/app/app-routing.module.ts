import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FeaturesComponent} from "./components/features/features.component";
import {SearchComponent} from "./components/search/search.component";
import {ApplicantComponent} from "./components/applicant/applicant.component";

const routes: Routes = [
  {path: '', component: SearchComponent},
  {path: 'feature/:pid', component: FeaturesComponent},
  {path: 'applicant', component: ApplicantComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
