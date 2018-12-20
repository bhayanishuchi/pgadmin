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
  displayedColumns: any[] = ['select', 'pid', 'mun', 'tract', 'block', 'lot'];
  length;
  selectedPID;
  selected = true;


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
            console.log('res',res);
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
    this.selected = event;
    this.selectedPID =  event;
  }

  onUpdate(data) {
    console.log('sdsss',data);
    // alert(JSON.stringify(data));
    alert('Pid:' + data.pid + '\n' + 'Mun:' + data.mun + '\n' +'Tract:'  + data.tract + '\n' + 'Block:' + data.block + '\n' + 'Lot:' + data.lot)
  }

  onReset() {
    this.selected = false;
  }
}
