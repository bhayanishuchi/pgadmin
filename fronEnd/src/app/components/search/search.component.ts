import {Component, OnInit, ViewChild} from '@angular/core';
import {NgxSpinnerService} from "ngx-spinner";
import {FeatureService} from "../../services/feature.service";
import {Router} from "@angular/router";
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  items: any = [];
  features: any = [];
  pid: any = [];
  showDropdown = false;
  responseData: any=[];
  dataSource: any = [];
  displayedColumns: any[] = ['select', 'mun', 'tract', 'block', 'lot','unit'];
  length;
  showDiv = false;
  unitSearch;
  munSearch;
  tractSearch;
  blockSearch;
  lotSearch;
  data: any = [];
  mun:any = [];

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
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onSearch(data) {
   // this.dataSource.sort = this.sort;
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
          console.log('PIDres',res);
          if(res.total === 0) {
              this.showDiv = true;
              this.spinner.hide();
          } else {
              this.showDiv = false;
              setTimeout(() => {
                this.dataSource = new MatTableDataSource(res.pid = res.pid.filter(x=>x.pun = x.pun.toString()));
                // this.dataSource = res.pid;
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
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
    window.open('/feature/' + data,'_blank');
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
