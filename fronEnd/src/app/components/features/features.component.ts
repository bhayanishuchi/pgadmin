import { Component, OnInit } from '@angular/core';
import {NgxSpinnerService} from "ngx-spinner";
import {FeatureService} from "../../services/feature.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent implements OnInit {
  showData= false;
  featuresData: any = [];
  features: any = [];
  featureName;
  feature;
  data:any = [];

  constructor(private spinner: NgxSpinnerService,
              private featureService: FeatureService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.spinner.show();
    let pid = this.route.snapshot.params;
    console.log('pid', pid);
    this.featureService.getFeature(pid)
      .subscribe((res) => {
          console.log('underferes', res);
          if(res.total === 0) {
            this.features = res;
            this.showData = false;
            this.spinner.hide();
          } else {
            this.showData = true;
            this.featuresData = res.features;
            this.data = res.features;
            this.features = res;
            console.log('features', this.features);
            this.spinner.hide();
          }

        },
        error1 => {
          console.log(error1);
          this.spinner.hide();
        });

  }

  filterData(){
    this.featuresData = this.data;
    if(this.featureName){
      this.featuresData = this.featuresData.filter(x=>x.FeatureTypeName.toLowerCase().indexOf(this.featureName.toLowerCase()) > -1)
    }
    if(this.feature) {
      this.featuresData = this.featuresData.filter(x => x.Feature.toLowerCase().indexOf(this.feature.toLowerCase()) > -1)
    }
  }

}
