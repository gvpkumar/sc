import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {  UserService,  } from '../../_services/index';
import { Router } from '@angular/router';

@Component({
  selector: 'dialog-content',
  templateUrl: 'dialogService.html'
})
export class DialogHorseService {
  constructor(
    public dialogRef: MatDialogRef<DialogHorseService>,
    public userService:UserService,
    public router:Router,

    @Inject(MAT_DIALOG_DATA) public data: any) {
      
    console.log("dialog content", data.id)
     
       // Debug this.loggerService.log("Date Format: ",data);
  }
    
  onNoClick(): void {
    this.dialogRef.close();
   
  }

  closeDialog(id) {
    this.delete(id);
    this.dialogRef.close();
    }
    getHorseServiceData(): any {
      //this.getData.length=0;
     
        this.userService.getHorseServiceData()
          .subscribe(
          data => {            
            this.data=data;        
            },
          error => {
            this.router.navigate(['/']);
  
          });
      }
    delete(id: string): any {
      //this.getData.length=0;
     
        this.userService.deleteHorseServiceDetails(id)
          .subscribe(
          data => {   
            console.log(data);         
            setTimeout(() => {
              this.getHorseServiceData();
            });
            this.router.navigate(['/horse-services']);
            },
          error => {
            this.router.navigate(['/']);
            //  this.alertService.error("Username or Password is Incorrect");
  
          });
      }
  }


