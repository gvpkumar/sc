import { Injectable, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { LoginDetails } from '../_models/index';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService implements OnInit {
    authenticatedUser;
    apartmentId;
    public loginDetails: LoginDetails;
    isLoggedIn: boolean;
    userName: string;
    email: string;
    model: any = {};
    items;
    status;
    headers;
    mainUrl = 'http://18.219.240.57:8080/';

    constructor(private http: Http, private router: Router) {
        // public AuthService: authService
        this.loginDetails = {
            isLoggedIn: false,
            userDetails: {
                userName: ''
            }
        };
    }
    ngOnInit() {
        this.headers = function () {
            // tslint:disable-next-line:prefer-const
            let headers = new Headers({ 'Content-Type': 'application/json' });
            headers.append('Access-Control-Allow-Origin', '*');
            headers.append('Accept', 'application/json');
            headers.append('Access-Control-Allow-Methods', 'POST');
            headers.append('Access-Control-Allow-Headers', 'Content-Type');
            headers.append('Content-Type', 'application/x-www-form-urlencoded');
            return headers;
        }
    }

    login(model: any): Observable<string> {
        // tslint:disable-next-line:prefer-const
        let options = new RequestOptions({ headers: this.headers });
        // tslint:disable-next-line:prefer-const
        let globalMainUrl = this.mainUrl + 'Carrier/GoodsService/login';
        // let globalMainUrl = 'http://13.58.228.52:8080/NSSA/NSSA/login';

        return this.http.post(globalMainUrl, model, options).map((response: Response) => {
            // tslint:disable-next-line:prefer-const
            let loginResponse = response.json();
            // tslint:disable-next-line:prefer-const
            let Access_token = response.headers.get('access_token');
            // var Access_token1 = JSON.parse(Access_token);
            console.log('Access_token1', loginResponse);
            // tslint:disable-next-line:prefer-const
            let expiery = response.headers.get('expiery');

            if (loginResponse) {
                this.loginDetails = {
                    isLoggedIn: true,
                    userDetails: {
                        userName: loginResponse.user.userName,
                        role: loginResponse.user.type;
                    }
                };

                localStorage.setItem('userRole', loginResponse.user.type);
                // tslint:disable-next-line:prefer-const
                let currentUser: any = localStorage.setItem('currentUser', JSON.stringify(this.loginDetails));
                let access_token: any = localStorage.setItem('access_token', Access_token);
                let expiry: any = localStorage.setItem('expiery', expiery);
                return loginResponse;
            } else {
                // Debug : this.loggerService.log("loginResponse", loginResponse.error);
                return loginResponse.error;
            }
        }).catch(this.handleErrorObservable);
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('access_token');
        localStorage.removeItem('expiery');
        this.isLoggedIn = false;
        this.router.navigate(['/']);
    }
    private handleErrorObservable(error: Response | any) {
        return Observable.throw(error.message || error);
    }
}


