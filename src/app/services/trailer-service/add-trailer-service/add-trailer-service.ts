import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Component, OnInit, AfterViewInit, NgZone, ElementRef, NgModule } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthenticationService, UserService, LoggerService } from '../../../_services/index';
import { LoginDetails } from '../../../_models/index';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'add-trailer-service',
  styleUrls: ['add-trailer-service.scss'],
  templateUrl: 'add-trailer-service.html',
})
export class AddTrailerServiceComponent {

  model: any = {};
  data = [];
  constructor(public userService: UserService,
    public router: Router,
    public loggerService: LoggerService,
    public authService: AuthenticationService,
    private dialog: MatDialog) {

    this.model.crossborderCountry = 'Select Country';
  }
  openDialog(): void {
    let dialogRef = this.dialog.open(DialogAddTrailerServiceComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
  submit() {

    console.log(this.model);
    this.userService.addTrailerServiceData(this.model)
      .subscribe(
      data => {
        this.data = data;
        this.loggerService.log("data", this.data);
        this.router.navigate(['/trailer-services']);
      },
      error => {

        console.log("Already exists", error);
        this.openDialog();
      });
  }
}
@Component({
  selector: 'dialog-content',
  template: `<mat-dialog-content fxLayout="column" style="text-align:center">
  <div>
      <h2 style="color:red"> Already Exists</h2>
  </div>
  <span fxFlex></span>
  <div>
      <button mat-raised-button color="primary" (click)="onNoClick()">Ok</button>
  </div>

</mat-dialog-content>`
})
export class DialogAddTrailerServiceComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogAddTrailerServiceComponent>,
  ) {

  }
  onNoClick(): void {
    this.dialogRef.close();

  }

}




