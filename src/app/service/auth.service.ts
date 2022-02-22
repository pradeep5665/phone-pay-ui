import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient) {
  }
  token: string;
  param1: string;

  isTokenExpired(token?: string): boolean {
    this.token = sessionStorage.getItem('userToken1');
    console.log('isTokenExpired : ', this.token);
    if(!token) token = this.token;
    if(!token) return true;

    const date = this.getTokenExpirationDate(token);
    if(date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }
 
  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);

    if (decoded.exp === undefined) return null;

    const date = new Date(0); 
    date.setUTCSeconds(decoded.exp);
    console.log('expiry time for user : ',date);
    return date;
  }
}
 