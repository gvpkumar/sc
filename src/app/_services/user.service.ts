import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { LoginDetails } from '../_models/index';
import { LoggerService } from './logger.service';
@Injectable()
export class UserService {
    jobcards: any;
    isLoggedIn: boolean;
    userName: string;
    email: string;
    headers;
    customersData = [];
    trucksData = [];
    driversData = [];
    statusCode;
    loginDetails: LoginDetails;
    mainUrl = 'http://18.219.240.57:8080/Carrier';
    constructor(private http: Http,
        public loggerService: LoggerService) {
        this.loginDetails = {
            isLoggedIn: false,
            userDetails: {
                userName: ''
            }
        };
        console.log(localStorage.getItem('access_token'));
        this.headers = function () {
            const headers = new Headers({ 'Content-Type': 'application/json' });
            headers.append('Access-Control-Allow-Origin', '*');
            headers.append('Accept', 'application/json');
            // headers.append('access_token','Content' );
            headers.append('Access-Control-Allow-Methods', 'POST');
            headers.append('Access-Control-Allow-Headers', 'Content-Type');
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            headers.append('Authorization', localStorage.getItem('access_token'));
            return headers;
        };
    }

    getCustomers(): Observable<any> {
        const options = new RequestOptions({ headers: this.headers });

        const globalMainUrl = this.mainUrl + '/user/customerDetails';
        return this.http.get(globalMainUrl, options).map((response: Response) => {
            return response.json();
        }).catch(this.handleErrorObservable);
    }
    /** Api To add Customer Details */
    addCustomerData(model: any): Observable<any> {
        const options = new RequestOptions({ headers: this.headers });
        const globalMainUrl = this.mainUrl + '/user/customerDetail';
        return this.http.post(globalMainUrl, model, options).map((response: Response) => {
            const loginResponse = response.json();
            this.loggerService.log('create response', loginResponse);

            if (loginResponse) {
            }

            if (loginResponse.Error === true) {
                // Debug : this.loggerService.log(loginResponse.Error);
                throw new Error('Error');
            }

        }).catch(this.handleErrorObservable);
    }
    /** Api To add Coupon Details */
    addCouponData(model: any): Observable<any> {
        const options = new RequestOptions({ headers: this.headers });
        const globalMainUrl = this.mainUrl + '/coupon/coupon';
        return this.http.post(globalMainUrl, model, options).map((response: Response) => {
            const loginResponse = response.json();
            this.loggerService.log('create response', loginResponse);

            if (loginResponse) {
                return loginResponse;
            }

            if (loginResponse.Error === true) {
                // Debug : this.loggerService.log(loginResponse.Error);
                throw new Error('Error');
            }

        }).catch(this.handleErrorObservable);
    }
    /** Api To delete Coupon Details */
    deleteCouponDetails(id: any): Observable<any> {
        const options = new RequestOptions({ headers: this.headers });
        const postUrl = this.mainUrl + 'coupon/coupon/';
        const globalMainUrl = postUrl + id;
        return this.http.delete(globalMainUrl, options).map((response: Response) => {
            this.loggerService.log('create response', response);
            const loginResponse = response.json();
            if (loginResponse) {
                return loginResponse;
            }

            /*if (loginResponse.Error === true) {
                // Debug : this.loggerService.log(loginResponse.Error);
                throw new Error('Error');
            }*/

        }).catch(this.handleErrorObservable);
    }
    /** API to get Coupon Data */
    getCouponData(status): Observable<any> {
        let globalMainUrl = '';
        if (status === 'All' || status === '') {
            status = '';
        }
        const options = new RequestOptions({ headers: this.headers });
        if (!status) {
            globalMainUrl = this.mainUrl + '/coupon/coupon';
        } else {
            globalMainUrl = this.mainUrl + '/coupon/coupon/status?status=' + status;
        }
        return this.http.get(globalMainUrl, options).map((response: Response) => {

            const loginResponse = response.json();
            this.loggerService.log('create response', loginResponse);
            if (loginResponse) {
                this.customersData = loginResponse;
                return this.customersData;
            }

            if (loginResponse.Error === true) {
                // Debug : this.loggerService.log(loginResponse.Error);
                throw new Error('Error');
            }

        }).catch(this.handleErrorObservable);
    }

    /** Api To add Order Details */
    addOrderData(model: any): Observable<any> {
        const options = new RequestOptions({ headers: this.headers });
        const globalMainUrl = this.mainUrl + '/user/orderDetail';
        return this.http.post(globalMainUrl, model, options).map((response: Response) => {
            const loginResponse = response.json();
            this.loggerService.log('create response', loginResponse);

            if (loginResponse) {
                return loginResponse;
            }

            if (loginResponse.Error === true) {
                // Debug : this.loggerService.log(loginResponse.Error);
                throw new Error('Error');
            }
        }).catch(this.handleErrorObservable);
    }
    /** API to update Order details */
    updateOrderDetails(model): Observable<any> {

        const options = new RequestOptions({ headers: this.headers });
        const globalMainUrl = this.mainUrl + '/user/orderDetail/';
        // const globalMainUrl = "http://localhost:3000/api/users";
        const postUrl = globalMainUrl;
        return this.http.put(postUrl, model, options).map((response: Response) => {

            const loginResponse = response.json();
            this.loggerService.log('create response', loginResponse);
            if (loginResponse) {
                this.customersData = loginResponse;
                return this.customersData;
            }

            if (loginResponse.Error === true) {
                // Debug : this.loggerService.log(loginResponse.Error);
                throw new Error('Error');
            }

        }).catch(this.handleErrorObservable);

    }
    /** Api To delete Order Details */
    deleteOrderDetails(id: any): Observable<any> {
        const options = new RequestOptions({ headers: this.headers });
        const postUrl = this.mainUrl + '/user/orderDetail/';
        const globalMainUrl = postUrl + id;
        return this.http.delete(globalMainUrl, options).map((response: Response) => {
            this.loggerService.log('create response', response);
            const loginResponse = response.json();
            if (loginResponse) {
                return loginResponse;
            }

            if (loginResponse.Error === true) {
                // Debug : this.loggerService.log(loginResponse.Error);
                throw new Error('Error');
            }

        }).catch(this.handleErrorObservable);
    }
    /**API to get cargo details */
    getOrderDetails(id): Observable<any> {
        const options = new RequestOptions({ headers: this.headers });

        const globalMainUrl = this.mainUrl + '/user/orderDetail/';
        // const globalMainUrl = "http://localhost:3000/api/users";
        const postUrl = globalMainUrl + id;
        return this.http.get(postUrl, options)
            .map((response: Response) => {

                const loginResponse = response.json();
                const n = loginResponse.length;
                console.log('loginResponse', loginResponse);

                return loginResponse;

            });

    }
    /** API to get Order Data */
    getOrderData(status): Observable<any> {
        if (status === 'All' || status === '') {
            status = '';
        }
        let globalMainUrl = '';
        const options = new RequestOptions({ headers: this.headers });
        if (status) {
            globalMainUrl = this.mainUrl + '/user/orderDetail/status?status=' + status;
        } else {
            globalMainUrl = this.mainUrl + '/user/orderDetail';
        }

        return this.http.get(globalMainUrl, options).map((response: Response) => {

            const loginResponse = response.json();
            this.loggerService.log('create response', loginResponse);
            if (loginResponse) {
                this.customersData = loginResponse;
                return this.customersData;
            }

            if (loginResponse.Error === true) {
                // Debug : this.loggerService.log(loginResponse.Error);
                throw new Error('Error');
            }

        }).catch(this.handleErrorObservable);


    }
    /** Api To add horse service Details */
    addHorseServiceData(model: any): Observable<any> {
        const options = new RequestOptions({ headers: this.headers });
        const globalMainUrl = this.mainUrl + '/horseService';
        return this.http.post(globalMainUrl, model, options).map((response: Response) => {
            const loginResponse = response.json();
            this.loggerService.log('create response', loginResponse);

            if (loginResponse) {
            }

            if (loginResponse.Error === true) {
                // Debug : this.loggerService.log(loginResponse.Error);
                throw new Error('Error');
            }

        }).catch((error: any) => {
            if (error.status === 409) {
                return Observable.throw(new Error(error.status));
            }

        });
    }
    /**API to get horse Service data */
    getHorseServiceData(): Observable<any> {
        const options = new RequestOptions({ headers: this.headers });
        const globalMainUrl = this.mainUrl + '/horseServices';
        return this.http.get(globalMainUrl, options)
            .map((response: Response) => {
                const loginResponse = response.json();
                this.loggerService.log(loginResponse);
                return loginResponse;
            });
    }
    /** Api To delete horse service Details */
    deleteHorseServiceDetails(id: any): Observable<any> {
        const options = new RequestOptions({ headers: this.headers });
        const postUrl = this.mainUrl + '/horseService/';
        const globalMainUrl = postUrl + id;
        return this.http.delete(globalMainUrl, options).map((response: Response) => {
            this.loggerService.log('create response', response);
            const loginResponse = response.json();
            if (loginResponse) {
                return loginResponse;
            }

        }).catch(this.handleErrorObservable);
    }
    /**API to get horse service  details */
    getHorseServiceDetails(id): Observable<any> {
        const options = new RequestOptions({ headers: this.headers });
        const globalMainUrl = this.mainUrl + '/horseService/';
        // const globalMainUrl = "http://localhost:3000/api/users";
        const postUrl = globalMainUrl + id;
        return this.http.get(postUrl, options)
            .map((response: Response) => {
                const loginResponse = response.json();
                const n = loginResponse.length;
                this.loggerService.log(loginResponse);
                return loginResponse;
            });
    }
    /** API to update horse service details */
    updateHorseServiceDetails(getData): Observable<any> {
        console.log(getData, 'getdata');
        const options = new RequestOptions({ headers: this.headers });
        const globalMainUrl = this.mainUrl + '/horseService';
        // const globalMainUrl = "http://localhost:3000/api/users";
        const postUrl = globalMainUrl;
        return this.http.put(postUrl, getData, options).map((response: Response) => {

            const loginResponse = response.json();
            console.log('create response', loginResponse);
            if (loginResponse) {
                this.customersData = loginResponse;
                return this.customersData;
            }
            if (loginResponse.Error === true) {
                // Debug : this.loggerService.log(loginResponse.Error);
                throw new Error('Error');
            }

        }).catch(this.handleErrorObservable);

    }
    /** Api To add Trailer service Details */
    addTrailerServiceData(model: any): Observable<any> {
        const options = new RequestOptions({ headers: this.headers });
        const globalMainUrl = this.mainUrl + '/trailerService';
        return this.http.post(globalMainUrl, model, options).map((response: Response) => {
            const loginResponse = response.json();
            this.loggerService.log('create response', loginResponse);

            if (loginResponse) {
            }

            if (loginResponse.Error === true) {
                // Debug : this.loggerService.log(loginResponse.Error);
                throw new Error('Error');
            }

        }).catch((error: any) => {
            if (error.status === 409) {
                return Observable.throw(new Error(error.status));
            }

        });
    }
    /**API to get horse Service data */
    getTrailerServiceData(): Observable<any> {
        const options = new RequestOptions({ headers: this.headers });
        const globalMainUrl = this.mainUrl + '/trailerServices';
        return this.http.get(globalMainUrl, options)
            .map((response: Response) => {
                const loginResponse = response.json();
                this.loggerService.log(loginResponse);
                return loginResponse;
            });
    }
    /** Api To delete horse service Details */
    deleteTrailerServiceDetails(id: any): Observable<any> {
        const options = new RequestOptions({ headers: this.headers });
        const postUrl = this.mainUrl + '/trailerService/';
        const globalMainUrl = postUrl + id;
        return this.http.delete(globalMainUrl, options).map((response: Response) => {
            this.loggerService.log('create response', response);
            const loginResponse = response.json();
            if (loginResponse) {
                return loginResponse;
            }

        }).catch(this.handleErrorObservable);
    }
    /**API to get horse service  details */
    getTrailerServiceDetails(id): Observable<any> {
        const options = new RequestOptions({ headers: this.headers });
        const globalMainUrl = this.mainUrl + '/trailerService/';
        // const globalMainUrl = "http://localhost:3000/api/users";
        const postUrl = globalMainUrl + id;
        return this.http.get(postUrl, options)
            .map((response: Response) => {
                const loginResponse = response.json();
                const n = loginResponse.length;
                this.loggerService.log(loginResponse);
                return loginResponse;
            });
    }
    /** API to update horse service details */
    updateTrailerServiceDetails(getData): Observable<any> {
        const options = new RequestOptions({ headers: this.headers });

        const globalMainUrl = this.mainUrl + '/trailerService';
        // const globalMainUrl = "http://localhost:3000/api/users";
        const postUrl = globalMainUrl;
        return this.http.put(postUrl, getData, options).map((response: Response) => {

            const loginResponse = response.json();
            console.log('create response', loginResponse);
            if (loginResponse) {
                this.customersData = loginResponse;
                return this.customersData;
            }
            if (loginResponse.Error === true) {
                // Debug : this.loggerService.log(loginResponse.Error);
                throw new Error('Error');
            }

        }).catch(this.handleErrorObservable);

    }


    /** Api To add Driver Details */
    addDriverData(model: any): Observable<any> {
        const options = new RequestOptions({ headers: this.headers });
        const globalMainUrl = this.mainUrl + '/user/driverDetail';
        return this.http.post(globalMainUrl, model, options).map((response: Response) => {
            this.loggerService.log('create response', response);
            const loginResponse = response.json();
            if (loginResponse) {
                return loginResponse;
            }

            if (loginResponse.Error === true) {
                // Debug : this.loggerService.log(loginResponse.Error);
                throw new Error('Error');
            }

        }).catch((error: any) => {
            if (error.status === 409) {
                return Observable.throw(new Error(error.status));
            }

        });
    }
    /** Api To add cargo Details */
    addCargo(model: any): Observable<any> {
        const options = new RequestOptions({ headers: this.headers });
        const globalMainUrl = this.mainUrl + 'user/cargoDetail';
        return this.http.post(globalMainUrl, model, options).map((response: Response) => {
            const loginResponse = response.json();
            this.loggerService.log('create response', loginResponse);

            if (loginResponse) {
            }

            if (loginResponse.Error === true) {
                // Debug : this.loggerService.log(loginResponse.Error);
                throw new Error('Error');
            }

        }).catch(this.handleErrorObservable);


    }

    /** Api To delete Driver Details */
    deleteDriverDetails(id: any): Observable<any> {
        const options = new RequestOptions({ headers: this.headers });
        const postUrl = this.mainUrl + '/user/driverDetail/';
        const globalMainUrl = postUrl + id;
        return this.http.delete(globalMainUrl, options).map((response: Response) => {
            this.loggerService.log('create response', response);
            const loginResponse = response.json();
            if (loginResponse) {
                return loginResponse;
            }

            /*if (loginResponse.Error === true) {
                // Debug : this.loggerService.log(loginResponse.Error);
                throw new Error('Error');
            }*/

        }).catch(this.handleErrorObservable);
    }
    /** Api To delete Truck Details */
    deleteTruckDetails(id: any): Observable<any> {
        const options = new RequestOptions({ headers: this.headers });
        const postUrl = this.mainUrl + '/user/truck/';
        const globalMainUrl = postUrl + id;
        return this.http.delete(globalMainUrl, options).map((response: Response) => {
            this.loggerService.log('create response', response);
            const loginResponse = response.json();
            if (loginResponse) {
                return loginResponse;
            }

            /*if (loginResponse.Error === true) {
                // Debug : this.loggerService.log(loginResponse.Error);
                throw new Error('Error');
            }*/

        }).catch(this.handleErrorObservable);
    }
    /** Api To delete Driver Details */
    deleteCustomerDetails(id: any): Observable<any> {
        const options = new RequestOptions({ headers: this.headers });
        const postUrl = this.mainUrl + '/user/customerDetail/';
        const globalMainUrl = postUrl + id;
        return this.http.delete(globalMainUrl, options).map((response: Response) => {
            this.loggerService.log('create response', response);
            const loginResponse = response.json();
            if (loginResponse) {
                return loginResponse;
            }

            if (loginResponse.Error === true) {
                // Debug : this.loggerService.log(loginResponse.Error);
                throw new Error('Error');
            }

        }).catch(this.handleErrorObservable);
    }


    /**API to add horse data */
    addHorseData(model): Observable<any> {
        const options = new RequestOptions({ headers: this.headers });
        const globalMainUrl = this.mainUrl + '/horseDetail';
        return this.http.post(globalMainUrl, model, options)
            .map((response: Response) => {
                const loginResponse = response.json();
                this.statusCode = response.headers.get('Status Code');
                console.log('Status code', this.statusCode);

                this.loggerService.log(loginResponse);
                return loginResponse;


            }).catch((error: any) => {
                if (error.status === 409) {
                    return Observable.throw(new Error(error.status));
                }

            });
    }
    /**API to get horse data */
    getHorseData(): Observable<any> {
        const options = new RequestOptions({ headers: this.headers });
        const globalMainUrl = this.mainUrl + '/horseDetails';
        return this.http.get(globalMainUrl, options)
            .map((response: Response) => {
                const loginResponse = response.json();
                this.loggerService.log(loginResponse);
                return loginResponse;
            });
    }
    /** Api To delete horse Details */
    deleteHorseDetails(id: any): Observable<any> {
        const options = new RequestOptions({ headers: this.headers });
        const postUrl = this.mainUrl + '/horseDetail/';
        const globalMainUrl = postUrl + id;
        return this.http.delete(globalMainUrl, options).map((response: Response) => {
            this.loggerService.log('create response', response);
            const loginResponse = response.json();
            if (loginResponse) {
                return loginResponse;
            }

        }).catch(this.handleErrorObservable);
    }
    /**API to get horse details */
    getHorseDetails(id): Observable<any> {
        const options = new RequestOptions({ headers: this.headers });

        const globalMainUrl = this.mainUrl + '/horseDetail/';
        // const globalMainUrl = "http://localhost:3000/api/users";
        const postUrl = globalMainUrl + id;
        return this.http.get(postUrl, options)
            .map((response: Response) => {
                const loginResponse = response.json();
                const n = loginResponse.length;
                this.loggerService.log(loginResponse);
                return loginResponse;
            });

    }
    /** API to update horse details */
    updateHorseDetails(getData): Observable<any> {
        console.log(getData, 'getdata');
        const options = new RequestOptions({ headers: this.headers });
        const globalMainUrl = this.mainUrl + '/horseDetail';
        // const globalMainUrl = "http://localhost:3000/api/users";
        const postUrl = globalMainUrl;
        return this.http.put(postUrl, getData, options).map((response: Response) => {

            const loginResponse = response.json();
            console.log('create response', loginResponse);
            if (loginResponse) {
                this.customersData = loginResponse;
                return this.customersData;
            }
            if (loginResponse.Error === true) {
                // Debug : this.loggerService.log(loginResponse.Error);
                throw new Error('Error');
            }

        }).catch(this.handleErrorObservable);

    }
    /**API to add horse data */
    addTrailerData(model): Observable<any> {
        const options = new RequestOptions({ headers: this.headers });

        const globalMainUrl = this.mainUrl + '/trailerDetail';
        return this.http.post(globalMainUrl, model, options)
            .map((response: Response) => {
                const loginResponse = response.json();
                this.loggerService.log(loginResponse);
                return loginResponse;
            }).catch((error: any) => {
                if (error.status === 409) {
                    return Observable.throw(new Error(error.status));
                }

            });
    }
    /**API to get horse data */
    getTrailerData(): Observable<any> {
        const options = new RequestOptions({ headers: this.headers });

        const globalMainUrl = this.mainUrl + '/trailerDetails';
        return this.http.get(globalMainUrl, options)
            .map((response: Response) => {
                const loginResponse = response.json();
                this.loggerService.log(loginResponse);
                return loginResponse;
            });
    }
    /** Api To delete horse Details */
    deleteTrailerDetails(id: any): Observable<any> {
        const options = new RequestOptions({ headers: this.headers });
        const postUrl = this.mainUrl + '/trailerDetail/';
        const globalMainUrl = postUrl + id;
        return this.http.delete(globalMainUrl, options).map((response: Response) => {
            this.loggerService.log('create response', response);
            const loginResponse = response.json();
            if (loginResponse) {
                return loginResponse;
            }

        }).catch(this.handleErrorObservable);
    }
    /**API to get horse details */
    getTrailerDetails(id): Observable<any> {
        const options = new RequestOptions({ headers: this.headers });
        const globalMainUrl = this.mainUrl + '/trailerDetail/';
        // const globalMainUrl = "http://localhost:3000/api/users";
        const postUrl = globalMainUrl + id;
        return this.http.get(postUrl, options)
            .map((response: Response) => {
                const loginResponse = response.json();
                this.loggerService.log(loginResponse);
                return loginResponse;
            });
    }
    /** API to update trailer details */
    updateTrailerDetails(model): Observable<any> {

        const options = new RequestOptions({ headers: this.headers });
        const globalMainUrl = this.mainUrl + '/trailerDetail';
        // const globalMainUrl = "http://localhost:3000/api/users";
        const postUrl = globalMainUrl;
        return this.http.put(postUrl, model, options).map((response: Response) => {

            const loginResponse = response.json();
            this.loggerService.log('create response', loginResponse);
            if (loginResponse) {
                this.customersData = loginResponse;
                return this.customersData;
            }
            if (loginResponse.Error === true) {
                // Debug : this.loggerService.log(loginResponse.Error);
                throw new Error('Error');
            }

        }).catch(this.handleErrorObservable);

    }
    /**API to add truck data */
    addTruckData(model): Observable<any> {
        const options = new RequestOptions({ headers: this.headers });

        const globalMainUrl = this.mainUrl + '/user/truck';
        return this.http.post(globalMainUrl, model, options)
            .map((response: Response) => {
                const loginResponse = response.json();
                this.loggerService.log(loginResponse);
                return loginResponse;
            }).catch((error: any) => {
                if (error.status === 409) {
                    return Observable.throw(new Error(error.status));
                }

            });
    }
    /**API to get customer details */
    getCustomerDetails(id): Observable<any> {
        const options = new RequestOptions({ headers: this.headers });

        const globalMainUrl = this.mainUrl + '/user/customerDetail/';
        // const globalMainUrl = "http://localhost:3000/api/users";
        const postUrl = globalMainUrl + id;
        return this.http.get(postUrl, options)
            .map((response: Response) => {
                const loginResponse = response.json();
                this.loggerService.log(loginResponse);
                return loginResponse;
            });
    }
    /** API to update customer details */
    updateCustomerDetails(model): Observable<any> {

        const options = new RequestOptions({ headers: this.headers });
        const globalMainUrl = this.mainUrl + '/user/customerDetail/';
        // const globalMainUrl = "http://localhost:3000/api/users";
        const postUrl = globalMainUrl;
        return this.http.put(postUrl, model, options).map((response: Response) => {

            const loginResponse = response.json();
            this.loggerService.log('create response', loginResponse);
            if (loginResponse) {
                this.customersData = loginResponse;
                return this.customersData;
            }

            if (loginResponse.Error === true) {
                // Debug : this.loggerService.log(loginResponse.Error);
                throw new Error('Error');
            }

        }).catch(this.handleErrorObservable);

    }
    /** API to update customer details */
    updateDispatchDetails(data, id): Observable<any> {
        const model = { attachment: data, id: id };
        const options = new RequestOptions({ headers: this.headers });
        const globalMainUrl = this.mainUrl + '/dispatchDetails/dispatch/';
        // const globalMainUrl = "http://localhost:3000/api/users";
        const postUrl = globalMainUrl + id;
        return this.http.post(postUrl, data, options).map((response: Response) => {

            const loginResponse = response.json();
            this.loggerService.log('create response', loginResponse);
            if (loginResponse) {
                this.customersData = loginResponse;
                return this.customersData;
            }

            if (loginResponse.Error === true) {
                // Debug : this.loggerService.log(loginResponse.Error);
                throw new Error('Error');
            }

        }).catch(this.handleErrorObservable);

    }

    /**API to get driver details */
    getDriverDetails(id): Observable<any> {
        const options = new RequestOptions({ headers: this.headers });
        const globalMainUrl = this.mainUrl + '/user/driverDetails/';
        // const globalMainUrl = "http://localhost:3000/api/users";
        const postUrl = globalMainUrl + id;
        return this.http.get(postUrl, options)
            .map((response: Response) => {
                const loginResponse = response.json();
                this.loggerService.log(loginResponse);
                return loginResponse;
            });

    }
    /**API to get document details */
    getDocument(id): Observable<any> {
        const options = new RequestOptions({ headers: this.headers });
        const globalMainUrl = this.mainUrl + '/user/document/';
        // const globalMainUrl = "http://localhost:3000/api/users";
        const postUrl = globalMainUrl + id;
        return this.http.get(postUrl, options)
            .map((response: Response) => {
                const loginResponse = response.json();
                this.loggerService.log(loginResponse);
                return loginResponse;
            });
    }
    addDocument(model): Observable<any> {
        const options = new RequestOptions({ headers: this.headers });
        const globalMainUrl = this.mainUrl + '/user/document/';
        // const globalMainUrl = "http://localhost:3000/api/users";
        const postUrl = globalMainUrl;
        return this.http.post(postUrl, model, options)
            .map((response: Response) => {
                const loginResponse = response.json();
                this.loggerService.log(loginResponse);
                return loginResponse;
            });

    }
    /**API to get dispatch details */
    getDispatchDetails(id): Observable<any> {
        const options = new RequestOptions({ headers: this.headers });
        const globalMainUrl = this.mainUrl + '/dispatchDetails/dispatch/';
        // const globalMainUrl = "http://localhost:3000/api/users";
        const postUrl = globalMainUrl + id;
        return this.http.get(postUrl, options)
            .map((response: Response) => {
                const loginResponse = response.json();
                this.loggerService.log(loginResponse);
                return loginResponse;
            });

    }
    /** API to update driver details */
    updateDriverDetails(model): Observable<any> {
        const options = new RequestOptions({ headers: this.headers });
        const globalMainUrl = this.mainUrl + '/user/driverDetail/';
        // const globalMainUrl = "http://localhost:3000/api/users";
        const postUrl = globalMainUrl;
        return this.http.put(postUrl, model, options).map((response: Response) => {
            const loginResponse = response.json();
            this.loggerService.log('create response', loginResponse);
            if (loginResponse) {
                this.driversData = loginResponse;
                return this.driversData;
            }
            if (loginResponse.Error === true) {
                // Debug : this.loggerService.log(loginResponse.Error);
                throw new Error('Error');
            }

        }).catch(this.handleErrorObservable);

    }
    /**API to get driver details */
    getTruckDetails(id): Observable<any> {
        const options = new RequestOptions({ headers: this.headers });

        const globalMainUrl = this.mainUrl + '/user/truck/';
        // const globalMainUrl = "http://localhost:3000/api/users";
        const postUrl = globalMainUrl + id;
        return this.http.get(postUrl, options)
            .map((response: Response) => {

                const loginResponse = response.json();
                this.loggerService.log(loginResponse);
                return loginResponse;
            });
    }

    /** API to update truck details */
    getAllTrucks(): Observable<any> {
        const options = new RequestOptions({ headers: this.headers });
        const globalMainUrl = this.mainUrl + '/user/trucks/';
        const postUrl = globalMainUrl;
        return this.http.get(postUrl, options)
            .map((response: Response) => {
                const res = response.json();
                this.loggerService.log(res);
                return res;
            });
    }

    updateTruckDetails(model): Observable<any> {

        const options = new RequestOptions({ headers: this.headers });
        const globalMainUrl = this.mainUrl + '/user/truck/';
        // const globalMainUrl = "http://localhost:3000/api/users";
        return this.http.put(globalMainUrl, model, options).map((response: Response) => {

            const loginResponse = response.json();
            this.loggerService.log('create response', loginResponse);
            if (loginResponse) {
                this.driversData = loginResponse;
                return this.driversData;
            }

            if (loginResponse.Error === true) {
                // Debug : this.loggerService.log(loginResponse.Error);
                throw new Error('Error');
            }

        }).catch(this.handleErrorObservable);

    }
    /** API to get Clients Data */
    getCustomerData(): Observable<any> {
        const options = new RequestOptions({ headers: this.headers });
        const globalMainUrl = this.mainUrl + '/user/customerDetails';
        return this.http.get(globalMainUrl, options).map((response: Response) => {
            const loginResponse = response.json();
            this.loggerService.log('create response', loginResponse);
            if (loginResponse) {
                this.customersData = loginResponse;
                return this.customersData;
            }
            if (loginResponse.Error === true) {
                // Debug : this.loggerService.log(loginResponse.Error);
                throw new Error('Error');
            }
        }).catch(this.handleErrorObservable);
    }

    /** API to  get Challan  Data */
    getDispatchData(status): Observable<any> {
        if (status === 'All' || status === '') {
            status = '';
        }
        let globalMainUrl = '';
        const options = new RequestOptions({ headers: this.headers });
        if (!status) {
            globalMainUrl = this.mainUrl + '/dispatchDetails/dispatch';
        } else {
            globalMainUrl = this.mainUrl + '/dispatchDetails/dispatch/status?status=' + status;
        }
        return this.http.get(globalMainUrl, options).map((response: Response) => {
            const loginResponse = response.json();
            this.loggerService.log('create response', loginResponse);
            if (loginResponse) {
                this.customersData = loginResponse;
                return this.customersData;
            }
            if (loginResponse.Error === true) {
                // Debug : this.loggerService.log(loginResponse.Error);
                throw new Error('Error');
            }
        }).catch(this.handleErrorObservable);
    }


    /** API to get Cargo-Challan Data */
    getChallanCargoDataassociated(id): Observable<any> {
        const options = new RequestOptions({ headers: this.headers });
        const globalMainUrl = this.mainUrl + '/user/challancargoDetail/';
        const postUrl = globalMainUrl + id;
        return this.http.get(postUrl, options).map((response: Response) => {
            const loginResponse = response.json();
            this.loggerService.log('create response', loginResponse);
            if (loginResponse) {
                this.customersData = loginResponse;
                return this.customersData;
            }

            if (loginResponse.Error === true) {
                // Debug : this.loggerService.log(loginResponse.Error);
                throw new Error('Error');
            }
        }).catch(this.handleErrorObservable);
    }
    updatechallanCargoDetails(model, id): Observable<any> {
        const options = new RequestOptions({ headers: this.headers });
        const globalMainUrl = this.mainUrl + '/user/challancargoDetail/';
        const postUrl = globalMainUrl + id;
        return this.http.put(postUrl, model, options).map((response: Response) => {
            const loginResponse = response.json();
            this.loggerService.log('create response', loginResponse);
            if (loginResponse) {
                this.customersData = loginResponse;
                return this.customersData;
            }

            if (loginResponse.Error === true) {
                // Debug : this.loggerService.log(loginResponse.Error);
                throw new Error('Error');
            }
        }).catch(this.handleErrorObservable);


    }
    /** Api To add Dispatch Details */
    addDispatchData(model: any): Observable<any> {
        const options = new RequestOptions({ headers: this.headers });
        const globalMainUrl = this.mainUrl + '/dispatchDetails/dispatch';
        return this.http.post(globalMainUrl, model, options).map((response: Response) => {
            const loginResponse = response.json();
            this.loggerService.log('create response', loginResponse);
            if (loginResponse) {
                return loginResponse;
            }

            if (loginResponse.Error === true) {
                // Debug : this.loggerService.log(loginResponse.Error);
                throw new Error('Error');
            }
        }).catch(this.handleErrorObservable);


    }
    /** Api To delete Dispatch Details */
    deleteDispatchDetails(id: any): Observable<any> {
        const options = new RequestOptions({ headers: this.headers });
        const postUrl = this.mainUrl + '/dispatchDetails/dispatch//';
        const globalMainUrl = postUrl + id;
        return this.http.delete(globalMainUrl, options).map((response: Response) => {
            this.loggerService.log('create response', response);
            const loginResponse = response.json();
            if (loginResponse) {
                return loginResponse;
            }

            if (loginResponse.Error === true) {
                // Debug : this.loggerService.log(loginResponse.Error);
                throw new Error('Error');
            }
        }).catch(this.handleErrorObservable);
    }
    /** API to get Cargo-Challan Data */
    getDispatchCargoData(): Observable<any> {
        const options = new RequestOptions({ headers: this.headers });
        const globalMainUrl = this.mainUrl + '/dispatchDetails/dispatch/';
        // const postUrl= globalMainUrl + id;
        return this.http.get(globalMainUrl, options).map((response: Response) => {
            const loginResponse = response.json();
            this.loggerService.log('create response', loginResponse);
            if (loginResponse) {
                this.customersData = loginResponse;
                return this.customersData;
            }

            if (loginResponse.Error === true) {
                // Debug : this.loggerService.log(loginResponse.Error);
                throw new Error('Error');
            }
        }).catch(this.handleErrorObservable);


    }
    /** API to get trucks Data */
    getTrucksData(): Observable<any> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('access_token', localStorage.getItem('access_token'));
        headers.append('expiery', localStorage.getItem('expiery'));
        const options = new RequestOptions({ headers: headers });
        const globalMainUrl = this.mainUrl + '/user/trucks';
        return this.http.get(globalMainUrl, options).map((response: Response) => {
            const loginResponse = response.json();
            this.loggerService.log('create response', loginResponse);
            if (loginResponse) {
                this.trucksData = loginResponse;
                return this.trucksData;
            }
            if (loginResponse.Error === true) {
                // Debug : this.loggerService.log(loginResponse.Error);
                throw new Error('Error');
            }
        }).catch(this.handleErrorObservable);


    }
    /** API to get drivers Data */
    getDriversData(): Observable<any> {
        const options = new RequestOptions({ headers: this.headers });
        const globalMainUrl = this.mainUrl + '/user/driverDetails';
        return this.http.get(globalMainUrl, options).map((response: Response) => {
            const loginResponse = response.json();
            this.loggerService.log('create response', loginResponse);
            if (loginResponse) {
                this.driversData = loginResponse;
                return this.driversData;
            }

            if (loginResponse.Error === true) {
                // Debug : this.loggerService.log(loginResponse.Error);
                throw new Error('Error');
            }
        }).catch(this.handleErrorObservable);
    }

    postJobcard(model: any): Observable<any> {
        const options = new RequestOptions({ headers: this.headers });
        const globalMainUrl = this.mainUrl + '/user/jobCard';
        return this.http.post(globalMainUrl, model, options).map((response: Response) => {
            const resp = response.json();
            this.loggerService.log('create response', resp);
            if (resp) {
                return resp;
            }
            if (resp.Error === true) {
                // Debug : this.loggerService.log(loginResponse.Error);
                throw new Error('Error');
            }
        }).catch(this.handleErrorObservable);
    }

    getJobcards() {
        const options = new RequestOptions({ headers: this.headers });
        const globalMainUrl = this.mainUrl + '/user/jobCard';
        return this.http.get(globalMainUrl, options).map((response: Response) => {
            const res = response.json();
            this.loggerService.log('create response', res);
            if (res) {
                this.jobcards = res;
                return this.jobcards;
            }

            if (res.Error === true) {
                // Debug : this.loggerService.log(loginResponse.Error);
                throw new Error('Error');
            }
        }).catch(this.handleErrorObservable);
    }

    private jwt() {
        // create authorization header with jwt token
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            const headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }

    private handleErrorObservable(error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.message || error);
    }
}
