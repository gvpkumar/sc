import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Component, OnInit, AfterViewInit, NgZone, ElementRef, NgModule } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService, UserService, LoggerService } from '../../../_services/index';
import { LoginDetails } from '../../../_models/index';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'add-horse',
  styleUrls: ['add-horse.scss'],
  templateUrl: 'add-horse.html',
})
export class AddHorseComponent {
  comesaCountries = [
    { id: 1, country: 'BURUNDI', isSelected: false, expiry: '', visibility: 'hidden' },
    { id: 2, country: 'COMOROS', isSelected: false, expiry: '', visibility: 'hidden' },
    { id: 3, country: 'D.R.CONGO', isSelected: false, expiry: '', visibility: 'hidden' },
    { id: 4, country: 'DJIBOUTI', isSelected: false, expiry: '', visibility: 'hidden' },
    { id: 5, country: 'EGYPT', isSelected: false, expiry: '', visibility: 'hidden' },
    { id: 6, country: 'ERITREA', isSelected: false, expiry: '', visibility: 'hidden' },
    { id: 7, country: 'ETHIOPIA', isSelected: false, expiry: '', visibility: 'hidden' },
    { id: 8, country: 'KENYA', isSelected: false, expiry: '', visibility: 'hidden' },
    { id: 9, country: 'LIBYA', isSelected: false, expiry: '', visibility: 'hidden' },
    { id: 10, country: 'MADAGASCAR', isSelected: false, expiry: '', visibility: 'hidden' },
    { id: 11, country: 'MALAWI', isSelected: false, expiry: '', visibility: 'hidden' },
    { id: 12, country: 'MAURTIUS', isSelected: false, expiry: '', visibility: 'hidden' },
    { id: 13, country: 'RWANDA', isSelected: false, expiry: '', visibility: 'hidden' },
    { id: 14, country: 'SEYCHELLES', isSelected: false, expiry: '', visibility: 'hidden' },
    { id: 15, country: 'SUDAN', isSelected: false, expiry: '', visibility: 'hidden' },
    { id: 16, country: 'SWAZILAND', isSelected: false, expiry: '', visibility: 'hidden' },
    { id: 17, country: 'UGANDA', isSelected: false, expiry: '', visibility: 'hidden' },
    { id: 18, country: 'ZAMBIA', isSelected: false, expiry: '', visibility: 'hidden' },
    { id: 19, country: 'ZIMBABWE', isSelected: false, expiry: '', visibility: 'hidden' }
  ];
  model: any = {};
  data = [];
  horseAccessories = [];
  constructor(public userService: UserService,
    public router: Router,
    public loggerService: LoggerService,
    public authService: AuthenticationService,
    private dialog: MatDialog) {
    this.model.comesaCountries = [];
    this.model.crossborderCountry = 'Select Country';
  }

  valueCjanged() {
    console.log(this.comesaCountries);
  }
  trackByFn(index, item) {
    return item.id; // or item.id
  }

  selectCountry(comesa) {
    // comesa.isSelected = !comesa.isSelected;
  }
  addHorseAccessories() {
    this.horseAccessories.push({
      dateFitted: '',
      make: '',
      number: '',
      size: '',
      tyrePositions: ''
    });
  }
  onFocus(obj, comesa) {
    obj.value = comesa.expiry;
  }
  submit() {
    const selectedComesaCountries = this.comesaCountries.filter(comesa => {
      if (comesa.expiry) {
        return comesa;
      }
    });
    this.model.crossBorder = {};
    selectedComesaCountries.forEach(scc => {
      this.model.crossBorder[scc.country] = scc.expiry;
    });
    this.loggerService.log(this.model, 'model');
    this.model.horseAccessories = this.horseAccessories;
    console.log(this.model);
    this.userService.addHorseData(this.model)
      .subscribe(
        data => {
          this.data = data;
          this.loggerService.log('data', this.data);
          this.router.navigate(['/horses']);
        },
        error => {
          console.log('Already exists', error);
          this.openDialog();
        });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddHorseComponent, {
      width: '400px',
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
export class DialogAddHorseComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogAddHorseComponent>,
  ) {

  }
  onNoClick(): void {
    this.dialogRef.close();

  }

}



