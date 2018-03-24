import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Component, OnInit, AfterViewInit, NgZone, ElementRef, NgModule } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthenticationService, UserService, LoggerService } from '../../_services/index';
import { LoginDetails } from '../../_models/index';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

/**
 * @title Table with pagination
 */
@Component({
  selector: 'add-truck',
  styleUrls: ['add-truck.scss'],
  templateUrl: 'add-truck.html',
})
export class AddTruckComponent implements OnInit {

  model: any = {};
  horseData = [];
  trailerData = [];
  horseAccessories = [];
  data = [];
  constructor(public userService: UserService,
    public router: Router,
    public loggerService: LoggerService,
    public authService: AuthenticationService,
    private dialog: MatDialog) {

    this.model.trailerNumber = 'Select Trailer Number';
    this.model.horseNumber = 'Select Horse Number';
  }
  ngOnInit() {
    this.getHorseData();
    this.getTrailerData();
  }
  openDialog(): void {
    let dialogRef = this.dialog.open(DialogAddTruckComponent, {
      width: '400px',


    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
  getHorseData() {

    this.userService.getHorseData()
      .subscribe(
      data => {
        this.horseData = data;
        this.loggerService.log("data", this.horseData);
        // this.router.navigate(['/horses']);
      },
      error => {
        this.router.navigate(['/']);

      });
  }
  getTrailerData() {

    this.userService.getTrailerData()
      .subscribe(
      data => {
        this.trailerData = data;
        this.loggerService.log("data", this.trailerData);
        // this.router.navigate(['/horses']);
      },
      error => {
        this.router.navigate(['/']);

      });
  }
  submit() {
    this.loggerService.log(this.model, "model");
    console.log(this.model);
    this.userService.addTruckData(this.model)
      .subscribe(
      data => {
        this.data = data;
        this.loggerService.log("data", this.data);
        this.router.navigate(['/trucks']);
      },
      error => {

        console.log("Already exists", error);
        this.openDialog();
      });
  }
}
@Component({
  selector: 'dialog-content',
  templateUrl:'./dialogService.html'
})
export class DialogAddTruckComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogAddTruckComponent>,
  ) {

  }
  onNoClick(): void {
    this.dialogRef.close();

  }

}


