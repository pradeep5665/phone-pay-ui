import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PhonepayCheckPaymentResponse } from '../model/phonepay-check-payment-response.model';
import { Observable } from 'rxjs';
import { PhonepayCheckPaymemtRequest } from '../model/phonepay-check-paymemt-request.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class SchedulePhonePayPaymentsService {

  constructor(private http: HttpClient) { }

  baseUrl = environment.baseUrl;
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  scheduleCheckPayment(phonepayCheckRequest: PhonepayCheckPaymemtRequest): Observable<PhonepayCheckPaymentResponse> {
   // console.log('#########' + JSON.stringify(phonepayCheckRequest));
    return this.http.post<PhonepayCheckPaymentResponse>(this.baseUrl + '/scheduleCheckPayment', phonepayCheckRequest);
  }
}
