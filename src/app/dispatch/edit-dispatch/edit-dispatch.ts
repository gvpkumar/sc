import { MatPaginator, MatTableDataSource, PageEvent } from '@angular/material';
import { Component, OnInit, AfterViewInit, NgZone, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { AuthenticationService, UserService, LoggerService } from '../../_services/index';
import { LoginDetails } from '../../_models/index';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'edit-dispatch',
  styleUrls: ['edit-dispatch.scss'],
  templateUrl: 'edit-dispatch.html',
})
export class EditDispatchComponent implements OnInit {
  model: any = {};
  data = [];
  distanceValues;
  value1;
  newVal;
  getData: any = {};
  userId: String;
  output;
  filename1;files;src1;
  success: boolean;
  @ViewChild('distance') myTextArea: ElementRef;
  customerForm:boolean=false;
  pageEvent: PageEvent;
  resultsLength = 0;
  isLoadingResults = false;
  isRateLimitReached = false;
  getDocumentData;
  constructor(public userService: UserService,
    private route: ActivatedRoute,
    public router: Router,
    public http: HttpClient,
    public loggerService: LoggerService,
    public authenticationService: AuthenticationService,
    public domSanitizer:DomSanitizer) {

  }
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.userId = params['id'];
      this.loggerService.log(this.userId);
    });
    this.editDetails(this.userId);
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
  _handleReaderLoaded1(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.model.dispatchCustomerForm = btoa(binaryString);
    //this.model.driverAttachments = atob(this.model.driverAttachments);
    this.src1 = this.domSanitizer.bypassSecurityTrustResourceUrl('data:image/png/jpg;base64,' 
    + this.model.dispatchCustomerForm); 
    //let image1 = atob(this.model.imageimageUrl); 
  }
  editDetails(id: String): any {

    this.userService.getDispatchDetails(id)
      .subscribe(
      data => {

        this.getData = data;
         if(this.getData.dispatchAttachmentId!=null)
         {    
          this.getDocument();    
           }
           
        this.loggerService.log(this.getData, "getdata");

        this.output = "Updated Successfully";

        // this.router.navigate(['/Apartment-table']);
      },
      error => {
        this.router.navigate(['/']);
        //  this.alertService.error("Username or Password is Incorrect");

      });
  }
  getDocument()
  {

    this.userService.getDocument(this.getData.dispatchAttachmentId)
    .subscribe(
    data => {
      this.getDocumentData = data;
      this.loggerService.log(this.getDocumentData.documentDetail, "getdata");
    
      this.src1 = this.domSanitizer.bypassSecurityTrustResourceUrl('data:image/png/jpg;base64,' 
      + this.getDocumentData.documentDetail);             

      // this.router.navigate(['/Apartment-table']);
    },
    error => {
      this.router.navigate(['/']);
      //  this.alertService.error("Username or Password is Incorrect");

    });
  }
  update(): any {
    //this.getData.length=0;
   this.getData.attachment=this.model.dispatchCustomerForm;
    this.userService.updateDispatchDetails(this.getData.attachment,this.getData.dispatchTripNumber)
      .subscribe(
      data => {
        this.success = true;
        this.getData = JSON.parse(JSON.stringify(data));
        this.loggerService.log(this.getData, "getdata");
        this.router.navigate(['/dispatch']);
      },
      error => {
        this.router.navigate(['/']);

      });
  }
}





