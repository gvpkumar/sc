import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { AuthenticationService, UserService, LoggerService } from '../../_services/index';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'add-driver',
  styleUrls: ['add-driver.component.scss'],
  templateUrl: 'add-driver.component.html',
})
export class AddDriverComponent {
  model: any = {};
  data = [];
  files: FileList;
  document1: string;
  document2: string;
  reader = new FileReader();
  src1;
  filename1; filename2;
  src2;
  constructor(
    public userService: UserService,
    public router: Router,
    public loggerService: LoggerService,
    private dialog :MatDialog
  ) {

  }
  /*fileChange(event) {
    let document1: FileList = event.target.files;
    console.log(document1,"fileList");
    if(document1.length > 0) {
        let file: File = document[0];
        let formData:FormData = new FormData();
        formData.append('uploadFile', this.document1, file.name);
           
      this.model.document=document;
    }
       console.log(document,"fileList");
}*/
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
    this.model.driverAttachments = btoa(binaryString);
    //this.model.driverAttachments = atob(this.model.driverAttachments);
  
   // this.src1 = 'data:image/png;base64,' + this.model.document1;
  /* var byteCharacters = atob( this.model.driverAttachments);
   var byteNumbers = new Array(byteCharacters.length);
   for (var i = 0; i < byteCharacters.length; i++) {
       byteNumbers[i] = byteCharacters.charCodeAt(i);
   }
   this.model.driverAttachments = new Uint8Array(byteNumbers);
   console.log(  this.model.driverAttachments,"byte array")
    //let image1 = atob(this.model.imageimageUrl); */
  }
  _handleReaderLoaded2(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.model.driverPhoto = btoa(binaryString);

    this.src2 = 'data:image/png;base64,' + this.model.document2;

    //let image1 = atob(this.model.imageimageUrl); 
  }
  submit() {

    console.log(this.model, "model");
    this.userService.addDriverData(this.model)
      .subscribe(
      data => {
        this.data = data;
        this.loggerService.log("data", this.data);
        this.router.navigate(['/drivers']);
      },
      error => {
        console.log("Already exists", error);
        this.openDialog();
      });
  }
  openDialog(): void {
    let dialogRef = this.dialog.open(DialogAddDriverComponent, {
      width: '400px',
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
  export class DialogAddDriverComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogAddDriverComponent>,
  ) {
  
  }
  onNoClick(): void {
    this.dialogRef.close();
  
  }
  
  }
  
  
  
  