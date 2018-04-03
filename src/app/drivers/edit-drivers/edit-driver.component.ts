import { Component, ViewChild, NgModule, OnInit } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { AuthenticationService, UserService, LoggerService } from '../../_services/index';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';

/**
 * @title Table with pagination
 */
@Component({
  selector: 'edit-driver',
  styleUrls: ['edit-driver.component.scss'],
  templateUrl: 'edit-driver.component.html',
})
export class EditDriverComponent implements OnInit {
  getData: any = {};
  today;
  userId: String;
  output;
  driverDetailsId;
  driverName;
  contactNumber;
  getDocumentData;
  licenseNumber;
  address;
  dateOfJoining;
  driverAttachmentId;
  model: any = {};
  success: boolean;
  files; src1; src2; filename1; filename2;
  constructor(public authenticationService: AuthenticationService,
    public userService: UserService,
    private route: ActivatedRoute,
    public router: Router,
    public loggerService: LoggerService,
    public domSanitizer: DomSanitizer) {
    this.route.params.subscribe((params: Params) => {
      this.userId = params['id'];
      this.loggerService.log(this.userId);
    });
    this.editDetails(this.userId);
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
  getDocument(Id): any {
    this.userService.getDocument(Id)
      .subscribe(
        data => {
          this.getDocumentData = data;
          this.loggerService.log(this.getDocument, "getdata");

          this.src1 = this.domSanitizer.bypassSecurityTrustResourceUrl('data:image/png/jpg;base64,'
            + this.getDocumentData.documentDetail);

          // this.router.navigate(['/Apartment-table']);
        },
        error => {
          this.router.navigate(['/']);
          //  this.alertService.error("Username or Password is Incorrect");

        });
  }
  addDocument(): any {
    this.model.documentDetail = this.getDocumentData.documentDetail;
    this.model.id = this.getDocumentData.id;
    this.model.documentType = this.getDocumentData.documentType;
    this.model = { documentDetail: this.model.documentDetail, documentType: this.model.documentType, id: this.model.id, }
    this.userService.addDocument(this.model)
      .subscribe(
        data => {

          this.getDocumentData = data;

          this.loggerService.log(this.getData, "getdata");
          this.src1 = this.domSanitizer.bypassSecurityTrustResourceUrl('data:image/png/jpg;base64,'
            + this.getDocumentData.documentDetail);

          // this.router.navigate(['/Apartment-table']);
        },
        error => {
          this.router.navigate(['/']);
          //  this.alertService.error("Username or Password is Incorrect");

        });
  }
  editDetails(id: String): any {

    this.userService.getDriverDetails(id)
      .subscribe(
        data => {

          this.getData = data;
          this.getData.phoneNumber = data.driverContactNumber ? data.driverContactNumber.slice(-10) : '';
          this.getData.countryCode = data.driverContactNumber && this.getData.phoneNumber ?
            data.driverContactNumber.split(this.getData.phoneNumber)[0] : '';
          this.getData.altphoneNumber = data.driverAlternateContact ? data.driverAlternateContact.slice(-10) : '';
          this.getData.altcountryCode = data.driverAlternateContact && this.getData.altphoneNumber ?
            data.driverAlternateContact.split(this.getData.altphoneNumber)[0] : '';

          this.getDocument(this.getData.driverAttachmentId);
          console.log(this.getData, "data");
          this.loggerService.log(this.getData, "getdata");
          this.driverDetailsId = this.getData.driverDetailsId;
          this.src2 = this.domSanitizer.bypassSecurityTrustResourceUrl('data:image/png/jpg;base64,'
            + this.getData.driverPhoto);

          // this.router.navigate(['/Apartment-table']);
        },
        error => {
          this.router.navigate(['/']);
          //  this.alertService.error("Username or Password is Incorrect");

        });
  }
  changeListener1(event) {
    this.files = event.target.files;
    var reader = new FileReader();
    console.log(this.files[0].name);
    this.filename1 = this.files[0].name;
    reader.onload = this._handleReaderLoaded1.bind(this);
    reader.readAsBinaryString(this.files[0]);

    //  let image1 = 'data:image/png;base64,' + this.reader.result;
    // console.log(image1,"converted image"); // Converting binary string data. 

  }
  changeListener2(event) {
    this.files = event.target.files;
    var reader = new FileReader();
    console.log(this.filename2);
    this.filename2 = this.files[0].name;
    reader.onload = this._handleReaderLoaded2.bind(this);
    reader.readAsBinaryString(this.files[0]);

    //  let image1 = 'data:image/png;base64,' + this.reader.result;
    // console.log(image1,"converted image"); // Converting binary string data. 

  }
  _handleReaderLoaded1(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.getDocumentData.driverAttachments = btoa(binaryString);
    //this.model.driverAttachments = atob(this.model.driverAttachments);

    this.src1 = 'data:image/png;base64,' + this.getDocumentData.driverAttachments;

    //let image1 = atob(this.model.imageimageUrl); 
  }
  _handleReaderLoaded2(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.getData.driverPhoto = btoa(binaryString);
    this.src2 = this.domSanitizer.bypassSecurityTrustResourceUrl('data:image/png/jpg;base64,'
      + this.getData.driverPhoto);
  }
  update(): any {
    // this.addDocument();
    this.model.driverContactNumber = this.model.countryCode = this.model.phoneNumber;
    this.model.driverAlternateContact = this.model.altcountryCode = this.model.altphoneNumber;
    delete this.model.countryCode;
    delete this.model.altcountryCode;
    delete this.model.phoneNumber;
    delete this.model.altphoneNumber;

    this.getData.driverAttachments = this.getDocumentData.driverAttachments;
    this.userService.updateDriverDetails(this.getData)
      .subscribe(
        data => {
          this.success = true;

          this.getData = JSON.parse(JSON.stringify(data));


          this.loggerService.log(this.getData, "getdata");

          this.router.navigate(['/drivers']);
        },
        error => {
          this.router.navigate(['/']);
          //  this.alertService.error("Username or Password is Incorrect");

        });
  }
}


