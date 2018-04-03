import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Component, OnInit, AfterViewInit, NgZone, ElementRef, NgModule } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService, UserService, LoggerService } from '../../_services/index';
import { LoginDetails } from '../../_models/index';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'job-card',
  styleUrls: ['add-jobcard.scss'],
  templateUrl: 'add-jobcard.html',
})
export class AddJobcardComponent implements OnInit {
  drivers: any;
  model: any = {};
  file: any;
  data = [];
  allowUpload = false;
  trucks: any;
  downloadUrl = 'http://18.219.240.57:8080/Carrier/';

  constructor(public userService: UserService,
    public router: Router,
    public loggerService: LoggerService,
    public authService: AuthenticationService,
    private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getAllTrucks();
    this.getAllDrivers();
  }

  readFile(event) {
    this.file = event.target.files[0];
    this.allowUpload = true;
  }

  getAllTrucks() {
    this.userService.getAllTrucks()
      .subscribe(
        data => {
          this.trucks = data;
        },
        error => { },
        () => {

        });
  }

  getAllDrivers() {
    this.userService.getDriversData().subscribe(
      data => {
        console.log(data);
        this.drivers = data;
      },
      error => {},
      () => {}
    );
  }

  getBase64() {
    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    const that = this;
    reader.onload = function () {
      console.log(reader.result);
      that.model.jobCard = reader.result;
      that.allowUpload = false;
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }
  submit() {
    this.model.truckNo = 'Abcd1233';
    this.userService.postJobcard(this.model).subscribe(data => {

    }, error => {

    }, () => {

    });
  }
}
