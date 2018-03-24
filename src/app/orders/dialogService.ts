import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from '../_services/index';
import { Router } from '@angular/router';

@Component({
  selector: 'dialog-content',
  templateUrl: 'dialogService.html'
})
export class DialogOrderComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogOrderComponent>,
    public userService: UserService,
    public router: Router,

    @Inject(MAT_DIALOG_DATA) public data: any) {

    console.log("dialog content", data.id)

    // Debug this.loggerService.log("Date Format: ",data);
  }

  onNoClick(): void {
    this.dialogRef.close();

  }

  closeDialog(id) {
    this.delete(id);
    this.dialogRef.close();
  }
  getOrderData(status): any {
    //this.getData.length=0;

    this.userService.getOrderData(status)
      .subscribe(
        data => {
          this.data = data;
        },
        error => {
          this.router.navigate(['/']);

        });
  }
  delete(id: string): any {
    //this.getData.length=0;

    this.userService.deleteOrderDetails(id)
      .subscribe(
        data => {
          console.log(data);
          setTimeout(() => {
            this.getOrderData('All');
          });
          this.router.navigate(['/orders']);
        },
        error => {
          this.router.navigate(['/']);
          //  this.alertService.error("Username or Password is Incorrect");

        });
  }
}


