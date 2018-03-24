import {MatPaginator, MatTableDataSource} from '@angular/material';
import { Component, OnInit,AfterViewInit,NgZone,ElementRef,NgModule} from '@angular/core';
import {Router,ActivatedRoute} from "@angular/router";
import {  AuthenticationService,UserService,LoggerService } from '../../../_services/index';
import { LoginDetails } from '../../../_models/index';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'add-trailer',
  styleUrls: ['add-trailer.scss'],
  templateUrl: 'add-trailer.html',
})
export class AddTrailerComponent {
  
 model:any={};
  data=[];
  trailerAccessories=[];
  constructor(public userService:UserService,
  public router:Router,
  public loggerService:LoggerService,
  private dialog :MatDialog)
  {

    this.model.crossborderCountry='Select Country';
  }
  addTrailerAccessories()
  {
    
      this.trailerAccessories.push({
            dateFitted: "",
            make: "",
            number: "",
            size: "",
            tyrePositions: ""
          
      });
  }
  submit() {
    this.loggerService.log(this.model,"model");
    this.model.horseAccessories= this.trailerAccessories;
       this.userService.addTrailerData(this.model)
            .subscribe(
             data => {
                 this.data=data;
                 this.loggerService.log("data",this.data);
                 this.router.navigate(['/trailers']);
              },
             error => {
              console.log("Already exists", error);
              this.openDialog();
            });
        }
        openDialog(): void {
          let dialogRef = this.dialog.open(DialogAddTrailerComponent, {
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
        export class DialogAddTrailerComponent {
        constructor(
          public dialogRef: MatDialogRef<DialogAddTrailerComponent>,
        ) {
        
        }
        onNoClick(): void {
          this.dialogRef.close();
        
        }
        
        }
        