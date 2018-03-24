import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Component, OnInit, AfterViewInit, NgZone, ElementRef, NgModule } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { AuthenticationService, UserService, LoggerService } from '../../../_services/index';
import { LoginDetails } from '../../../_models/index';
/**
 * @title Table with pagination
 */
@Component({
  selector: 'edit-horse',
  styleUrls: ['edit-horse.scss'],
  templateUrl: 'edit-horse.html',
})
export class EditHorseComponent implements OnInit {

  model: any = {};
  data = [];
  userId;
  getData: any = [];
  horseNumber;
  output;
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
  }
  addHorseAccessories() {
    this.getData.horseAccessories.push({
      dateFitted: "",
      make: "",
      number: "",
      size: "",
      tyrePositions: ""
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
          this.loggerService.log(this.getData, "getdata");
          this.horseNumber = this.getData.horseNumber;
          this.output = "Updated Successfully";

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
    this.model.crossBorder = {};
    selectedComesaCountries.forEach(scc => {
      this.model.crossBorder[scc.country] = scc.expiry;
    });
    console.log(this.getData, "getdata");
    this.userService.updateHorseDetails(this.getData)
      .subscribe(
        data => {
          this.success = true;
          this.getData = JSON.parse(JSON.stringify(data));
          console.log(this.getData, "getdata");
          this.router.navigate(['/horses']);
        },
        error => {
          this.router.navigate(['/']);
          //  this.alertService.error("Username or Password is Incorrect");

        });
  }
}


