import { Component, ViewChild, OnInit } from '@angular/core';
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
import { DialogDispatchComponent } from '../dialogService';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dispatch',
  styleUrls: ['view-dispatch.scss'],
  templateUrl: 'view-dispatch.html',
})
export class DispatchComponent implements OnInit {
  dispatchStatus = 'All';
  statusList = ['All', 'Open', 'Closed', 'Pending', 'In Progress', 'Cancel'];

  isLoggedIn = false;
  getData;
  pageEvent: PageEvent;
  // tslint:disable-next-line:max-line-length
  displayedColumns = [/* 'customColumn1', */'dispatchTripNumber', 'dispatchDeliveryNoteNumber', 'dispatchWeight', 'dispatchDate', 'dispatchOrderId', 'dispatchConsignee', 'dispatchDeliveryDate', 'dispatchHorseNumber', 'dispatchDriverFirstname', 'dispatchSource', 'dispatchDestination', 'edit'];
  exampleDatabase: ExampleHttpDao | null;
  dataSource = new MatTableDataSource();

  resultsLength = 0;
  isLoadingResults = false;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;


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
    const currentUser = localStorage.getItem('currentUser');
    this.loggerService.log(currentUser, 'currentUser');
    this.authenticationService.loginDetails = JSON.parse(currentUser);
    this.getDispatchData(this.dispatchStatus);
  }

  onStatusChange(status) {
    this.dispatchStatus = status;
    this.getDispatchData(status);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  openDialog(id): void {
    console.log(id);
    const dialogRef = this.dialog.open(DialogDispatchComponent, {
      width: '400px',
      height: '160px',
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      setTimeout(() => {
        this.getDispatchData(this.dispatchStatus);
      });
    });
  }

  getDispatchData(status) {
    this.exampleDatabase = new ExampleHttpDao(this.http, this.authenticationService, this.userService);
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
        this.loggerService.log(this.dataSource);
        this.dataSource.paginator = this.paginator;
        //  this.loggerService.log("Received Data: ",JSON.stringify(data));
      });
  }
}

export interface CustomUrlInfo {
  name: string;
  position: number;
  address: string;
  phone: string;
}

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleHttpDao {

  model: any = {
  };
  urldetails: CustomUrlInfo[];
  constructor(private http: HttpClient,
    public authenticationService: AuthenticationService,
    private userService: UserService, ) {
  }

  // Api call to Fetch all the created url Links.
  getCustomUrlsCreatedList(status): Observable<CustomUrlInfo[]> {
    // this.model.userId = "sravanthi@smartrobos.com";
    return this.userService.getDispatchData(status);
  }
}
