import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Component, OnInit, AfterViewInit, NgZone, ElementRef, NgModule } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthenticationService, UserService, LoggerService } from '../../../_services/index';
import { LoginDetails } from '../../../_models/index';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'add-horse-service',
  styleUrls: ['add-horse-service.scss'],
  templateUrl: 'add-horse-service.html',
})
export class AddHorseServiceComponent {

  model: any = {};
  data = [];  
  constructor(public userService: UserService,
    public router: Router,
    public loggerService: LoggerService,
    public authService: AuthenticationService,
    private dialog:MatDialog) {
     
      this.model.crossborderCountry='Select Country';
  }
  openDialog(): void {
    let dialogRef = this.dialog.open(DialogAddHorseServiceComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
  submit() {
 
   console.log(this.model);
    this.userService.addHorseServiceData(this.model)
      .subscribe(
      data => {
        this.data = data;
        this.loggerService.log("data", this.data);
        this.router.navigate(['/horse-services']);
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
export class DialogAddHorseServiceComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogAddHorseServiceComponent>,
  ) {

  }
  onNoClick(): void {
    this.dialogRef.close();

  }

}


