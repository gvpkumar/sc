import { Injectable } from '@angular/core';
@Injectable()
export class OrderService {
    orderData: any = {}
    dispatchData: any = {}

    constructor() {
       
    }

    public setOrderDatafromService(data): void {

        this.orderData = data;
        console.log(this.orderData, "order data");
    }

    public getOrderDatafromService(): string {
        console.log(this.orderData, "order data");
        return this.orderData;
    }
    public setDispatchDatafromService(data): void {

        this.dispatchData = data;
        console.log(this.dispatchData, "order data");
    }

    public getDispatchDatafromService(): string {
        console.log(this.dispatchData, "dispatchData");
        return this.dispatchData;
    }
}