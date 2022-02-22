import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CancelPaymentResponse } from '../model/cancel-payment-response';

@Injectable()
export class CancelPaymentService {

  constructor(private http: HttpClient) { }

  baseUrl = environment.baseUrl;

  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  cancelPayment(paymentId: string[], canceledBy: string): Observable<CancelPaymentResponse> {
    return this.http.post<CancelPaymentResponse>(this.baseUrl + '/' + 'cancelPayment' + '/',
      { paymentIdOfCheckBox: paymentId,
        canceledBy: canceledBy},
      { headers: this.headers });
  }
}
