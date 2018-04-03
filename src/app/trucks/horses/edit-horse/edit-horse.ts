import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Component, OnInit, AfterViewInit, NgZone, ElementRef, NgModule } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthenticationService, UserService, LoggerService } from '../../../_services/index';
import { LoginDetails } from '../../../_models/index';
/**
 * @title Table with pagination
 */
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'edit-horse',
  styleUrls: ['edit-horse.scss'],
  templateUrl: 'edit-horse.html',
})
export class EditHorseComponent implements OnInit {
  today;
  model: any = {};
  data = [];
  userId;
  getData: any = [];
  horseNumber;
  output;
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
  success: boolean;
  constructor(public userService: UserService,
    public router: Router,
    public loggerService: LoggerService,
    public authService: AuthenticationService,
    private route: ActivatedRoute, ) {

  }
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.userId = params['id'];
      this.loggerService.log(this.userId);
    });
    this.editDetails(this.userId);
    this.today = this.formatDate(new Date());
  }
  removeAccessory(index) {
    if (this.getData.horseAccessories.length) {
      this.getData.horseAccessories.splice(index, 1);
    }
  }

  formatDate(date) {
    const d = new Date(date), year = d.getFullYear();
    let month = '' + (d.getMonth() + 1),
      day = '' + d.getDate();
    if (month.length < 2) { month = '0' + month; }
    if (day.length < 2) { day = '0' + day; }
    return [year, month, day].join('-');
  }

  addHorseAccessories() {
    this.getData.horseAccessories.push({
      dateFitted: '',
      make: '',
      number: '',
      size: '',
      tyrePositions: ''
    });
  }
  editDetails(id: String): any {

    this.userService.getHorseDetails(id)
      .subscribe(
        data => {
          this.getData = data;
          if (this.getData && this.getData.crossBorder) {
            Object.keys(this.getData.crossBorder).forEach( key => {
              this.comesaCountries.forEach(comesaCountry => {
                if (key.trim() === comesaCountry.country.trim()) {
                  comesaCountry.expiry = this.getData.crossBorder[key];
                  comesaCountry.isSelected = true;
                  comesaCountry.visibility = 'visible';
                }
              });
            });
          }
          this.getData.comesaCountries = this.comesaCountries;
          this.loggerService.log(this.getData, 'getdata');
          this.horseNumber = this.getData.horseNumber;
          this.output = 'Updated Successfully';

          // this.router.navigate(['/Apartment-table']);
        },
        error => {
          this.router.navigate(['/']);
          //  this.alertService.error("Username or Password is Incorrect");

        });
  }
  update(): any {
    //  this.getData.horseAccessories=this.horseAccessories;
    const selectedComesaCountries = this.comesaCountries.filter(comesa => {
      if (comesa.expiry) {
        return comesa;
      }
    });
    this.getData.crossBorder = {};
    selectedComesaCountries.forEach(scc => {
      this.getData.crossBorder[scc.country] = scc.expiry;
    });
    console.log(this.getData, 'getdata');
    this.userService.updateHorseDetails(this.getData)
      .subscribe(
        data => {
          this.success = true;
          this.getData = JSON.parse(JSON.stringify(data));
          console.log(this.getData, 'getdata');
          this.router.navigate(['/horses']);
        },
        error => {
          this.router.navigate(['/']);
          //  this.alertService.error("Username or Password is Incorrect");

        });
  }
}


