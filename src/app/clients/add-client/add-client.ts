import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Component, OnInit, AfterViewInit, NgZone, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService, UserService, LoggerService } from '../../_services/index';
import { LoginDetails } from '../../_models/index';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

/**
 * @title Table with pagination
 */
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'add-customer',
  styleUrls: ['add-client.scss'],
  templateUrl: 'add-client.html',
})
export class AddCustomerComponent {

  model: any = {};
  data = [];
  constructor(public userService: UserService,
    public router: Router,
    public loggerService: LoggerService,
    private dialog: MatDialog) {
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddCustomerComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
  submit() {
    this.model.customerPhone = this.model.countryCode + this.model.phoneNumber;
    delete this.model.countryCode;
    delete this.model.phoneNumber;
    this.loggerService.log(this.model, 'model');

    this.userService.addCustomerData(this.model)
      .subscribe(
        data => {
          this.data = data;
          this.loggerService.log('data', this.data);
          this.router.navigate(['/customers']);
        },
        error => {
          console.log('Already exists', error);
          this.openDialog();
        });
  }
}
@Component({
  // tslint:disable-next-line:component-selector
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
export class DialogAddCustomerComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogAddCustomerComponent>,
  ) { }
  onNoClick(): void {
    this.dialogRef.close();

  }
}


