import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { GetPaymentBatchResponse } from '../model/get-payment-batch-response';

@Injectable({
  providedIn: 'root'
})
export class PaymentBatchService {

  constructor(private http: HttpClient) { }

  baseUrl = environment.baseUrl;

  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  getPaymentBatchDetails(): Observable<GetPaymentBatchResponse> {
    return this.http.post<GetPaymentBatchResponse>(this.baseUrl + '/' + 'paymentBatch' + '/',
    { headers: this.headers });
  } 
}
