import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResearchPaymentResposne } from '../model/research-payment-resposne';
import { RearchPaymentRequest } from '../model/rearch-payment-request';
import { GetResearchPaymentResponse } from '../model/get-research-payment-response';

@Injectable({
  providedIn: 'root'
})
export class ResearchPaymentService {

  constructor(private http: HttpClient) { }

  baseUrl = environment.baseUrl; 

  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  getResearchPaymentInfo(researchPaymentReq: RearchPaymentRequest): Observable<ResearchPaymentResposne> {
    return this.http.post<ResearchPaymentResposne>(this.baseUrl + '/' + 'researchPayment', researchPaymentReq ,
    { headers: this.headers });
  }

  getResearchPaymentDetailsById(paymentId: number) {
    return this.http.post<GetResearchPaymentResponse>(this.baseUrl + '/' + 'getResearchPaymentDetails', 
    {paymentId: paymentId },
    { headers: this.headers });
  }
}
