import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {FeatureService} from "../../services/feature.service";

@Component({
  selector: 'app-component3',
  templateUrl: './component3.component.html',
  styleUrls: ['./component3.component.css']
})
export class Component3Component implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  items: any = [];
  features: any = [];
  pid: any = [];
  showDropdown = false;
  featuresData: any = [];
  dataSource: any = [];
  displayedColumns: any[] = ['select', 'mun', 'tract', 'block', 'lot', 'unit'];
  length;
  showData = false;
  noData = false;
  showDiv = false;
  munSearch;
  tractSearch;
  blockSearch;
  unitSearch;
  lotSearch;
  data: any = [];
  featureName;
  feature;
  data2:any = [];
  constructor(private spinner: NgxSpinnerService,
              private featureService: FeatureService,
              private router: Router) { }

  ngOnInit() {
    this.spinner.show();

    setTimeout(() => {
      this.items = [];
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 2000);
  }

  onSearch(data) {
    this.dataSource.sort = this.sort;

    this.spinner.show();
    if(data.mun !== undefined || data.tract !== undefined || data.block !== undefined || data.lot !== undefined) {
      let pdata = {
        mun: data.mun,
        tract: data.tract,
        block: data.block,
        lot: data.lot,
      };
      this.featureService.getPID(pdata)
        .subscribe((res) => {
            this.data = res.pid;
            console.log('res',res);
          if(res.total === 0) {
            this.showDiv = true;
            this.spinner.hide();
          } else {
            this.showDiv = false;
            setTimeout(() => {
              this.dataSource = new MatTableDataSource(res.pid);
              // this.dataSource = res.pid;
              this.dataSource.sort = this.sort;
              this.dataSource.paginator = this.paginator;
            });
            this.length = res.total;
            let fdata = [];
            for (let i = 0; i < res.total; i++) {
              fdata.push(res.pid[i].pid);
            }
            this.pid = fdata;
            this.spinner.hide();
            this.showDropdown = true;
          }
          },
          error1 => {
            console.log(error1);
            this.spinner.hide();
          });
    } else {
      this.spinner.hide();
      alert('Enter Value');
    }

  }

  openModal(data) {
    this.spinner.show();
    console.log('data',data);
    let pid = {
      pid:data
    }
    this.featureService.getFeature(pid)
      .subscribe((res) => {
          console.log('res', res);
          if(res.total === 0) {
            this.features = res;
            this.showData = true;
            this.noData = false;
            this.spinner.hide();
          } else {
            this.showData = true;
            this.noData = true;
            this.featuresData = res.features;
            this.data2 = res.features;
            this.features = res;
            this.spinner.hide();
          }

        },
        error1 => {
          console.log(error1);
          this.spinner.hide();
        });
  }

  filterData() {
    this.dataSource.data = this.data;
    if(this.unitSearch)
      this.dataSource.data = this.dataSource.data.filter(x => x.unit.indexOf(this.unitSearch) > -1)
    if(this.munSearch)
      this.dataSource.data = this.dataSource.data.filter(x => x.mun.indexOf(this.munSearch) > -1)
    if(this.tractSearch)
      this.dataSource.data = this.dataSource.data.filter(x => x.tract.indexOf(this.tractSearch) > -1)
    if(this.blockSearch)
      this.dataSource.data = this.dataSource.data.filter(x => x.block.indexOf(this.blockSearch) > -1)
    if(this.lotSearch)
      this.dataSource.data = this.dataSource.data.filter(x => x.lot.indexOf(this.lotSearch) > -1)
  }
  filterData2(){
    this.featuresData = this.data2;
    if(this.featureName){
      this.featuresData = this.featuresData.filter(x=>x.FeatureTypeName.toLowerCase().indexOf(this.featureName.toLowerCase()) > -1)
    }
    if(this.feature) {
      this.featuresData = this.featuresData.filter(x => x.Feature.toLowerCase().indexOf(this.feature.toLowerCase()) > -1)
    }
  }
}
