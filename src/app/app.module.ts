import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from "@angular/flex-layout";
import { CoreModule } from './core/core.module';
import { RoutingModule } from "./app-routing.module";
import { MaterialUiModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { OrderService } from "./orders/order.service";

//components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';


//drivers
import { DriversComponent } from './drivers/view-drivers/view-drivers';
import { AddDriverComponent,DialogAddDriverComponent } from './drivers/add-drivers/add-driver.component';
import { EditDriverComponent } from './drivers/edit-drivers/edit-driver.component';
import { DialogDriverComponent } from './drivers/dialogService';

//customers
import { ClientsComponent } from './clients/view-clients/view-clients';
import { AddCustomerComponent,DialogAddCustomerComponent } from './clients/add-client/add-client';
import { EditCustomerComponent } from './clients/edit-client/edit-client';
import { DialogCustomerComponent } from './clients/dialogService';

//Coupons
import { AddCouponComponent } from './coupons/add-coupon/add-coupon';
import { CouponsComponent } from './coupons/view-coupons/view-coupons';
import { AddCouponStep3Component } from './coupons/add-coupon-step3/add-coupon-step3';
import { DialogCouponComponent } from './coupons/dialogService';

//Dispatch
import { AddDispatchComponent } from './dispatch/add-dispatch/add-dispatch';
import { DispatchComponent } from './dispatch/view-dispatch/view-dispatch';
import { EditDispatchComponent } from './dispatch/edit-dispatch/edit-dispatch';
import { AddDispatchStep2Component } from './dispatch/add-dispatch-step2/add-dispatch-step2';
import {DialogDispatchComponent} from'./dispatch/dialogService';

//Orders
import { OrderComponent } from './orders/view-order/view-order';
import { AddOrderComponent } from './orders/add-order/add-order';
import { EditOrderComponent } from './orders/edit-order/edit-order';
import { DialogOrderComponent } from './orders/dialogService';

//trucks
import { TrucksComponent } from './trucks/view-trucks/view-trucks';
import { AddTruckComponent,DialogAddTruckComponent } from './trucks/add-truck/add-truck';
import { EditTruckComponent } from './trucks/edit-truck/edit-truck';
import { DialogTruckComponent } from './trucks/dialogService';

//Horses
import { HorsesComponent } from './trucks/horses/view-horses/view-horses';
import { AddHorseComponent,DialogAddHorseComponent } from './trucks/horses/add-horse/add-horse';
import { EditHorseComponent } from './trucks/horses/edit-horse/edit-horse';
import { DialogHorseComponent } from './trucks/horses/dialogService';

//trailers
import { TrailersComponent } from './trucks/trailers/view-trailers/view-trailers';
import { AddTrailerComponent,DialogAddTrailerComponent} from './trucks/trailers/add-trailer/add-trailer';
import { EditTrailerComponent } from './trucks/trailers/edit-trailer/edit-trailer';
import { DialogTrailerComponent } from './trucks/trailers/dialogService';

//Horse-service
import { HorseServicesComponent } from './services/horse-service/view-horse-services/view-horse-services';
import { AddHorseServiceComponent, DialogAddHorseServiceComponent } from './services/horse-service/add-horse-service/add-horse-service';
import { EditHorseServiceComponent } from './services/horse-service/edit-horse-service/edit-horse-service';
import { DialogHorseService } from './services/horse-service/dialogService';

//Trailer-service
import { TrailerServicesComponent } from './services/trailer-service/view-trailer-services/view-trailer-services';
import { AddTrailerServiceComponent, DialogAddTrailerServiceComponent } from './services/trailer-service/add-trailer-service/add-trailer-service';
import { EditTrailerServiceComponent } from './services/trailer-service/edit-trailer-service/edit-trailer-service';
import { DialogTrailerService } from './services/trailer-service/dialogService';

import { AuthenticationService, UserService, LoggerService } from './_services/index';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ClientsComponent,
    DriversComponent,
    AddDriverComponent,
    DialogDriverComponent,
    AddCustomerComponent,
    DialogAddCustomerComponent,
    EditDriverComponent,
    EditCustomerComponent,
    DialogCustomerComponent,
    LoginComponent,
    AddCouponComponent,
    CouponsComponent,
    DialogCouponComponent,
    AddCouponStep3Component,
    DispatchComponent,
    AddDispatchComponent,
    DialogDispatchComponent,
    OrderComponent,
    EditOrderComponent,
    DialogOrderComponent,
    AddOrderComponent,
    EditDispatchComponent,
    AddDispatchStep2Component,
    DialogAddTruckComponent,
    DialogAddTrailerComponent,
    DialogAddHorseComponent,
    //trucks
    HorsesComponent,
    AddHorseComponent,
    DialogHorseComponent,
    TrailersComponent,
    AddTrailerComponent,
    EditHorseComponent,
    EditTrailerComponent,
    DialogTrailerComponent,
    TrucksComponent,
    AddTruckComponent,
    EditTruckComponent,
    DialogTruckComponent,
    DialogAddDriverComponent,
    DialogAddTrailerServiceComponent,
    DialogAddHorseServiceComponent,
    //services
    HorseServicesComponent,
    AddHorseServiceComponent,
    EditHorseServiceComponent,
    DialogHorseService,
    TrailerServicesComponent,
    AddTrailerServiceComponent,
    EditTrailerServiceComponent,
    DialogTrailerService

  ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FlexLayoutModule,
    RoutingModule,
    CoreModule,
    MaterialUiModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule

  ],
  providers: [
    AuthenticationService,
    UserService,
    LoggerService,
    OrderService
  ],
  bootstrap: [AppComponent],
  entryComponents: [DialogHorseService, DialogTrailerService,
     DialogHorseComponent,DialogTrailerComponent,DialogCustomerComponent,
     DialogDriverComponent,DialogOrderComponent,DialogDispatchComponent,
     DialogCouponComponent,DialogTruckComponent,DialogAddTruckComponent,
     DialogAddHorseComponent,DialogAddTrailerComponent,DialogAddDriverComponent,
     DialogAddCustomerComponent,DialogAddTrailerServiceComponent,DialogAddHorseServiceComponent]
})
export class AppModule { }
