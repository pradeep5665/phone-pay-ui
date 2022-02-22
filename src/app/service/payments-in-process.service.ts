import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PaymentsInProcessResponse } from '../model/payments-in-process-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentsInProcessService {

  constructor(private http: HttpClient) { }

  baseUrl = environment.baseUrl; 

  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  getPaymentsInProcessList(): Observable<PaymentsInProcessResponse> {
    return this.http.post<PaymentsInProcessResponse>(this.baseUrl + '/' + 'getPaymentsInProcess',
      { headers: this.headers });
  }
}
