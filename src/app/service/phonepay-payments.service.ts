import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { PhonepayPayments } from '../model/phonepay-payments.model';
import { Observable } from 'rxjs';
import { BankingInfo } from '../model/banking-info';
import { environment } from 'src/environments/environment';

@Injectable()

export class PhonepayPaymentsService {

  constructor(private http: HttpClient) { }

  baseUrl = environment.baseUrl;

  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });


  getBorrowersInfo(loanNumber: number): Observable<PhonepayPayments> {
    return this.http.post<PhonepayPayments>(this.baseUrl + '/' + 'phonepayCheck' + '/' + loanNumber,
      { headers: this.headers });
  }

  bankingInfo(routingNumber: string): Observable<BankingInfo> {
    console.log('#########', routingNumber);
    return this.http.post<BankingInfo>(this.baseUrl + '/' + 'bankingInfo' + '/',
      { routingNum: routingNumber },
      { headers: this.headers });
  }
}

