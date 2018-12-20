import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../environments/environment";

export const FEATURES: any = [
  {
    "FeatureTypeName": "Environmental",
    "Feature": "Basal groundwater area within 100m",
    "FeatureTypeID": 25
  },
  {
    "FeatureTypeName": "Map image",
    "Feature": "Map image",
    "FeatureTypeID": 27
  },
  {
    "FeatureTypeName": "Environmental",
    "Feature": "Hagåtña Basin within 100m",
    "FeatureTypeID": 15
  },
  {
    "FeatureTypeName": "Utility",
    "Feature": "Poles within 500 feet",
    "FeatureTypeID": 2
  },
  {
    "FeatureTypeName": "Utility",
    "Feature": "Sewer within 100 feet",
    "FeatureTypeID": 2
  },
  {
    "FeatureTypeName": "Environmental",
    "Feature": "Land Slide Risk LOW within 100m",
    "FeatureTypeID": 911
  },
  {
    "FeatureTypeName": "Environmental",
    "Feature": "Autogenic recharge zone within 100m",
    "FeatureTypeID": 25
  },
  {
    "FeatureTypeName": "Environmental",
    "Feature": "Land Use Zone C within 100m",
    "FeatureTypeID": 77
  },
  {
    "FeatureTypeName": "Environmental",
    "Feature": "Land Use Zone M-1 within 100m",
    "FeatureTypeID": 77
  }
];
@Injectable()

export class FeatureService {
  constructor(private http: HttpClient) { }

  getPID(data) {
    console.log('api data',data);
    return this.http.post<any>(environment.local + 'FCLand/', data);
  }
  getFeature(data) {
    return this.http.post<any>(environment.local + 'FCLand/features', data);
  }
}
