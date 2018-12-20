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
  featuresData: any=[];
  dataSource: any = [];
  displayedColumns: any[] = ['select', 'pid', 'mun', 'tract', 'block', 'lot'];
  length;
  showData = false;
  noData = false;
  showDiv = false;
  /*settings = {
    columns: {
      id: {
        title: 'ID'
      },
      name: {
        title: 'Name'
      },
      age: {
        title: 'Age'
      }
    }
  };*/

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
            console.log('res',res);
          if(res.total === 0) {
            this.showDiv = true;
            this.spinner.hide();
          } else {
            this.showDiv = false;
            setTimeout(() => {
              this.dataSource = new MatTableDataSource(res.pid);
              // this.dataSource = res.pid;
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
            this.features = res;
            this.spinner.hide();
          }

        },
        error1 => {
          console.log(error1);
          this.spinner.hide();
        });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
