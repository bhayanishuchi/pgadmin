import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {NgxSpinnerService} from "ngx-spinner";
import {FeatureService} from "../../services/feature.service";
import {Router} from "@angular/router";
import {JSON_CONFIG_FILENAME} from "tslint/lib/configuration";

@Component({
  selector: 'app-applicant',
  templateUrl: './applicant.component.html',
  styleUrls: ['./applicant.component.css']
})
export class ApplicantComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  items: any = [];
  features: any = [];
  pid: any = [];
  showDropdown = false;
  dataSource: any = [];
  displayedColumns: any[] = ['select', 'mun', 'tract', 'block', 'lot','unit'];
  length;
  selectedPID;
  isSelected = false;
  isChecked = false;
  showDiv = false;
  unitSearch;
  munSearch;
  tractSearch;
  blockSearch;
  lotSearch;
  data: any = [];
  mun: any = [];

  constructor(private spinner: NgxSpinnerService,
              private featureService: FeatureService,
              private router: Router) { }

  ngOnInit() {
    this.spinner.show();
    this.featureService.getMun().subscribe(data => {
      if(data){
        console.log('here' , data);
        this.mun = data.results;
      }
    })
    setTimeout(() => {
      this.items = [];
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 2000);
  }

  onSearch(data) {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
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
            console.log('res',res);if(res.total === 0) {
            this.showDiv = true;
            this.spinner.hide();
          } else {
             this.showDiv = false;
              setTimeout(() => {
                this.dataSource = new MatTableDataSource(res.pid);
                // this.dataSource = res.pid;
                this.dataSource.paginator = this.paginator;
              });
              // this.dataSource = res.pid;
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

  onClick(event) {
    console.log('eeeee', event);
    this.selectedPID =  event;
  }

  onUpdate(data) {
    console.log('sdsss',data);
    // alert(JSON.stringify(data));
    alert('Pid:' + data.pid + '\n' + 'Mun:' + data.mun
      + '\n' +'Tract:'  + data.tract
      + '\n' + 'Block:' + data.block
      + '\n' + 'Lot:' + data.lot
      + '\n' + 'Pun:' + data.pun
      + '\n' + 'Unit:' + data.unit
      + '\n' + 'Parcel Source Search:' + data.Parcel_Source_Search);
  }

  onReset() {
    this.isChecked = false;
    this.isSelected = false;
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
}
