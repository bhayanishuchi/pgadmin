import {Component, OnInit, ViewChild} from '@angular/core';
import {NgxSpinnerService} from "ngx-spinner";
import {FeatureService} from "../../services/feature.service";
import {Router} from "@angular/router";
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";

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
  displayedColumns: any[] = ['select', 'pid', 'mun', 'tract', 'block', 'lot'];
  length;

  constructor(private spinner: NgxSpinnerService,
              private featureService: FeatureService,
              private router: Router) { }

  ngOnInit() {
    this.spinner.show();

    setTimeout(() => {
      this.items = ['Amsterdam', 'Antwerp', 'Athens', 'Barcelona',
        'Berlin', 'Birmingham', 'Bradford', 'Bremen', 'Brussels', 'Bucharest',
        'Budapest', 'Cologne', 'Copenhagen', 'Dortmund', 'Dresden', 'Dublin',
        'Düsseldorf', 'Essen'];
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
    this.router.navigate(['/feature', data])
  }

}
