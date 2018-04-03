import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Component, OnInit, AfterViewInit, NgZone, ElementRef, NgModule } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService, UserService, LoggerService } from '../../../_services/index';
import { LoginDetails } from '../../../_models/index';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'add-horse-service',
  styleUrls: ['add-horse-service.scss'],
  templateUrl: 'add-horse-service.html',
})
export class AddHorseServiceComponent implements OnInit {

  model: any = {};
  data = [];
  today;
  constructor(public userService: UserService,
    public router: Router,
    public loggerService: LoggerService,
    public authService: AuthenticationService,
    private dialog: MatDialog) {

    this.model.crossborderCountry = 'Select Country';
  }

  ngOnInit() {
    this.today = this.formatDate(new Date());
  }

  formatDate(date) {
    const d = new Date(date), year = d.getFullYear();
    let month = '' + (d.getMonth() + 1),
      day = '' + d.getDate();
    if (month.length < 2) { month = '0' + month; }
    if (day.length < 2) { day = '0' + day; }
    return [year, month, day].join('-');
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddHorseServiceComponent, {
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
          this.loggerService.log('data', this.data);
          this.router.navigate(['/horse-services']);
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
export class DialogAddHorseServiceComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogAddHorseServiceComponent>,
  ) {

  }
  onNoClick(): void {
    this.dialogRef.close();

  }

}


