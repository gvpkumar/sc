import { Component, ViewChild ,NgModule} from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { AuthenticationService, UserService,LoggerService } from '../../_services/index';
import { Router, ActivatedRoute, Params } from '@angular/router';
/**
 * @title Table with pagination
 */
@Component({
  selector: 'edit-order',
  styleUrls: ['edit-order.scss'],
  templateUrl: 'edit-order.html',
})
export class EditOrderComponent {
  getData:any={};
  userId:String;
  output;
  customerName;
  customerPhone;
  customerAddress;
  model: any = {};
  success:boolean;
  constructor(public authenticationService: AuthenticationService,
    public userService: UserService,
    private route: ActivatedRoute,
    public router: Router,
    public loggerService:LoggerService) {

  }
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.userId = params['id'];
      this.loggerService.log(this.userId);
    });
    this.editDetails(this.userId);
  }
  editDetails(id: String): any {
    
    this.userService.getOrderDetails(id)
      .subscribe(
      data => {

        this.getData = data;
        this.loggerService.log(this.getData, "getdata");
       this.customerName= this.getData.customerName;
        this.output = "Updated Successfully";

        // this.router.navigate(['/Apartment-table']);
      },
      error => {
        this.router.navigate(['/']);
        //  this.alertService.error("Username or Password is Incorrect");

      });
  }
  update():any {
    //this.getData.length=0;
    
      
             this.userService.updateOrderDetails(this.getData)
                .subscribe(
                 data => {
                     this.success=true;
                this.getData = JSON.parse(JSON.stringify(data)); 
                this.loggerService.log (  this.getData,"getdata" );
               
                   this.router.navigate(['/orders']);
                  },
                 error => {
                    this.router.navigate(['/']);
                   //  this.alertService.error("Username or Password is Incorrect");
 
                 });
          } 
}


