import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './core/admin/admin.component';



//drivers
import { DriversComponent } from './drivers/view-drivers/view-drivers';
import { AddDriverComponent } from './drivers/add-drivers/add-driver.component';
import { EditDriverComponent } from './drivers/edit-drivers/edit-driver.component';

//customers
import { ClientsComponent } from './clients/view-clients/view-clients';
import { AddCustomerComponent } from './clients/add-client/add-client';
import { EditCustomerComponent } from './clients/edit-client/edit-client';
import { LoginComponent } from './login/login.component';

//Coupons
import { AddCouponComponent } from './coupons/add-coupon/add-coupon';
import { CouponsComponent } from './coupons/view-coupons/view-coupons';
import { AddCouponStep3Component } from './coupons/add-coupon-step3/add-coupon-step3';

//Dispatch
import { AddDispatchComponent } from './dispatch/add-dispatch/add-dispatch';
import { DispatchComponent } from './dispatch/view-dispatch/view-dispatch';
import { EditDispatchComponent } from './dispatch/edit-dispatch/edit-dispatch';
import { AddDispatchStep2Component } from './dispatch/add-dispatch-step2/add-dispatch-step2';

//Cargo
import { OrderComponent } from './orders/view-order/view-order';
import { AddOrderComponent } from './orders/add-order/add-order';
import { EditOrderComponent } from './orders/edit-order/edit-order';

//Horses
import { HorsesComponent } from './trucks/horses/view-horses/view-horses';
import { AddHorseComponent } from './trucks/horses/add-horse/add-horse';
import { EditHorseComponent } from './trucks/horses/edit-horse/edit-horse';

//trailers
import { TrailersComponent } from './trucks/trailers/view-trailers/view-trailers';
import { AddTrailerComponent } from './trucks/trailers/add-trailer/add-trailer';
import { EditTrailerComponent } from './trucks/trailers/edit-trailer/edit-trailer';

//trucks
import { TrucksComponent } from './trucks/view-trucks/view-trucks';
import { AddTruckComponent } from './trucks/add-truck/add-truck';
import { EditTruckComponent } from './trucks/edit-truck/edit-truck';

//Horse-service
import { HorseServicesComponent } from './services/horse-service/view-horse-services/view-horse-services';
import { AddHorseServiceComponent } from './services/horse-service/add-horse-service/add-horse-service';
import { EditHorseServiceComponent } from './services/horse-service/edit-horse-service/edit-horse-service';

//Trailer-service
import { TrailerServicesComponent } from './services/trailer-service/view-trailer-services/view-trailer-services';
import { AddTrailerServiceComponent } from './services/trailer-service/add-trailer-service/add-trailer-service';
import { EditTrailerServiceComponent } from './services/trailer-service/edit-trailer-service/edit-trailer-service';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {

    path: '',
    component: AdminComponent,
    children: [
      /*{
        path: '',
        component: HomeComponent,
        pathMatch: 'full'
      },*/

      {
        path: 'drivers',
        component: DriversComponent,
      },
      {
        path: 'add-driver',
        component: AddDriverComponent,
      },

      {
        path: 'edit-driver-details/:id',
        component: EditDriverComponent,
      },
      {
        path: 'customers',
        component: ClientsComponent,
      },
      {
        path: 'add-customer',
        component: AddCustomerComponent,
      },
      {
        path: 'edit-customer-details/:id',
        component: EditCustomerComponent,
      },

      {
        path: 'add-coupon',
        component: AddCouponComponent,
      },
      {
        path: 'coupons',
        component: CouponsComponent,
      },
      {
        path: 'add-coupon-step3',
        component: AddCouponStep3Component,
      },
      {
        path: 'dispatch',
        component: DispatchComponent,
      },
      {
        path: 'add-dispatch',
        component: AddDispatchComponent,
      },
      {
        path: 'add-dispatch-step2',
        component: AddDispatchStep2Component,
      },
      {
        path: 'edit-dispatch-details/:id',
        component: EditDispatchComponent,
      },
      {
        path: 'add-order',
        component: AddOrderComponent,
      },
      {
        path: 'orders',
        component: OrderComponent,
      },
      {
        path: 'edit-order-details/:id',
        component: EditOrderComponent,
      },
      {
        path: 'horses',
        component: HorsesComponent,
      },
      {
        path: 'add-horse',
        component: AddHorseComponent,
      },
      {
        path: 'edit-horse-details/:id',
        component: EditHorseComponent,
      },
      {
        path: 'trailers',
        component: TrailersComponent,
      },
      {
        path: 'add-trailer',
        component: AddTrailerComponent,
      },
      {
        path: 'edit-trailer-details/:id',
        component: EditTrailerComponent,
      },
      {
        path: 'trucks',
        component: TrucksComponent,
      },
      {
        path: 'add-truck',
        component: AddTruckComponent,
      },
      {
        path: 'edit-truck-details/:id',
        component: EditTruckComponent,
      },
      {
        path: 'edit-trailer-service-details/:id',
        component: EditTrailerServiceComponent,
      },
      {
        path: 'trailer-services',
        component: TrailerServicesComponent,
      },
      {
        path: 'add-trailer-service',
        component: AddTrailerServiceComponent,
      },
      {
        path: 'edit-horse-service-details/:id',
        component: EditHorseServiceComponent,
      },
      {
        path: 'horse-services',
        component: HorseServicesComponent,
      },
      {
        path: 'add-horse-service',
        component: AddHorseServiceComponent,
      },
    ]
  }



];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class RoutingModule { }