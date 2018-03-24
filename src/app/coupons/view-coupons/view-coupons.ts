import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, PageEvent } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import { AuthenticationService, UserService, LoggerService } from '../../_services/index';
import { DialogCouponComponent } from '../dialogService';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
/**
 * @title Table with pagination
 */
@Component({
  selector: 'coupons',
  styleUrls: ['view-coupons.scss'],
  templateUrl: 'view-coupons.html',
})
export class CouponsComponent {
  couponStatus = 'All';
  statusList = ['All', 'Open', 'Closed', 'Pending', 'In Progress'];
  isLoggedIn: boolean = false;
  getData;
  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */



  displayedColumns = ['customColumn1', 'dispatchTripNumber', 'couponStartLocation', 'couponEndLocation', 'couponValue',
    'couponRequestedBy', 'couponApprovedBy', 'couponIssuedBy', 'couponOpeningMeter', 'couponClosingMeter', 'print'];
  exampleDatabase: ExampleHttpDao | null;
  dataSource = new MatTableDataSource();

  resultsLength = 0;
  isLoadingResults = false;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageEvent: PageEvent;

  constructor(private http: HttpClient,
    public router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    public loggerService: LoggerService,
    private dialog: MatDialog) { }
  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngOnInit() {
    this.isLoadingResults = true;
    let currentUser = localStorage.getItem('currentUser');
    this.loggerService.log(currentUser, "currentUser");
    this.authenticationService.loginDetails = JSON.parse(currentUser);
    this.getCouponData(this.couponStatus);
  }
  openDialog(id): void {
    console.log(id);
    let dialogRef = this.dialog.open(DialogCouponComponent, {
      width: '400px',
      height: '160px',
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      setTimeout(() => {
        this.getCouponData(this.couponStatus);
      });
    });
  }

  onStatusChange(status){
    this.couponStatus = status;
    this.getCouponData(status);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  getCouponData(status) {
    this.exampleDatabase = new ExampleHttpDao(this.http, this.authenticationService, this.userService);

    // If the user changes the sort order, reset back to the first page.

    //this.sort.sortChange, this.paginator.page
    Observable.merge()
      .startWith(null)
      .switchMap(() => {
        this.isLoadingResults = true;
        return this.exampleDatabase!.getCustomUrlsCreatedList(status);
      })
      .map(data => {
        // Flip flag to show that loading has finished.
        this.isLoadingResults = false;
        this.isRateLimitReached = false;
        this.resultsLength = data.length;
        return data;
      })
      .catch(() => {
        this.isLoadingResults = false;
        // Catch if the GitHub API has reached its rate limit. Return empty data.
        this.isRateLimitReached = true;
        return Observable.of([]);
      })
      .subscribe(data => {
        this.dataSource.data = data;
        console.log(data);
        this.dataSource.paginator = this.paginator;
        //  this.loggerService.log("Received Data: ",JSON.stringify(data));
      });

  }

  print(id) {

    // this.data=data;
    // console.log(data);
    // this.router.navigate(['/dashboard']);
    //  window.location.href="http://13.58.228.52:8080/VisaService/visaApplicationService/getPDF?id="+id;
    window.open("http://18.219.240.57:8080/Carrier/coupon/generateCoupon/" + id, "_blank");
  }

}

export interface customUrlInfo {
  name: string;
  position: number;
  address: string;
  phone: string;
}



/** An example database that the data source uses to retrieve data for the table. */
export class ExampleHttpDao {

  model: any = {
  };
  urldetails: customUrlInfo[];

  constructor(private http: HttpClient,
    public authenticationService: AuthenticationService,
    private userService: UserService, ) {

  }



  //Api call to Fetch all the created url Links.

  getCustomUrlsCreatedList(status): Observable<customUrlInfo[]> {
    // this.model.userId = "sravanthi@smartrobos.com";

    return this.userService.getCouponData(status);

  }


}