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
    { id: 1, country: 'Burundi', isSelected: false, expiry: '', visibility: 'hidden' },
    { id: 2, country: 'Comoros', isSelected: false, expiry: '', visibility: 'hidden' },
    { id: 3, country: 'D.R. Congo', isSelected: false, expiry: '', visibility: 'hidden' },
    { id: 4, country: 'Djibouti', isSelected: false, expiry: '', visibility: 'hidden' },
    { id: 5, country: 'Egypt', isSelected: false, expiry: '', visibility: 'hidden' },
    { id: 6, country: 'Eritrea', isSelected: false, expiry: '', visibility: 'hidden' },
    { id: 7, country: 'Ethiopia', isSelected: false, expiry: '', visibility: 'hidden' },
    { id: 8, country: 'Kenya', isSelected: false, expiry: '', visibility: 'hidden' },
    { id: 9, country: 'Libya', isSelected: false, expiry: '', visibility: 'hidden' },
    { id: 10, country: 'Madagascar', isSelected: false, expiry: '', visibility: 'hidden' },
    { id: 11, country: 'Malawi', isSelected: false, expiry: '', visibility: 'hidden' },
    { id: 12, country: 'Mauritius', isSelected: false, expiry: '', visibility: 'hidden' },
    { id: 13, country: 'Rwanda', isSelected: false, expiry: '', visibility: 'hidden' },
    { id: 14, country: 'Seychelles', isSelected: false, expiry: '', visibility: 'hidden' },
    { id: 15, country: 'Sudan', isSelected: false, expiry: '', visibility: 'hidden' },
    { id: 16, country: 'Swaziland', isSelected: false, expiry: '', visibility: 'hidden' },
    { id: 17, country: 'Uganda', isSelected: false, expiry: '', visibility: 'hidden' },
    { id: 18, country: 'Zambia', isSelected: false, expiry: '', visibility: 'hidden' },
    { id: 19, country: 'Zimbabwe', isSelected: false, expiry: '', visibility: 'hidden' }
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
    this.model.comesaCountries = this.comesaCountries.filter(comesa => {
      if (comesa.expiry) {
        return comesa;
      }
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



