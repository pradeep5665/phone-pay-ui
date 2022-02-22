import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ProcessPaymentsResponse } from '../model/process-payments-response';
import { PaymentProcessingResposnene } from '../model/payment-processing-resposnene';
import { GetProcessPaymentsListDto } from '../model/get-process-payments-list-dto';
import { ProcessPaymentsNotificationResponse } from '../model/process-payments-notification-response';

@Injectable({
  providedIn: 'root'
})
export class GetProcessPaymentsListService {

  constructor(private http: HttpClient) { }

  baseUrl = environment.baseUrl;
  processingURl = environment.processingURL;

  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  getProcessPaymentsList(): Observable<ProcessPaymentsResponse> {
    return this.http.post<ProcessPaymentsResponse>(this.baseUrl + '/' + 'getProcessPaymentsList',
      { headers: this.headers });
  }

  getProcessPaymentsNotificationList(updatedForNoti:boolean, processPaymentsList:GetProcessPaymentsListDto[],successfulIds:number[]): Observable<ProcessPaymentsNotificationResponse> {
    return this.http.post<ProcessPaymentsNotificationResponse>(this.baseUrl + '/' + 'getProcessPaymentsNotificationList',
    {
      updatedForNoti: updatedForNoti,
      processPaymentsList : processPaymentsList,
      successfulIds : successfulIds
     },
    { headers: this.headers });
  }

  getProcessPaymentsLetterNotificationList(updatedForNoti:boolean, processPaymentsList:GetProcessPaymentsListDto[],successfulIds:number[],processPaymentsListForFailedPrints:GetProcessPaymentsListDto[]): Observable<ProcessPaymentsNotificationResponse> {
    return this.http.post<ProcessPaymentsNotificationResponse>(this.baseUrl + '/' + 'getProcessPaymentsLetterNotificationList',
    {
      updatedForNoti: updatedForNoti,
      processPaymentsList : processPaymentsList,
      successfulIds : successfulIds,
      processPaymentsListForFailedPrints : processPaymentsListForFailedPrints
     },
    { headers: this.headers });
  }

  // paymentProcessing(processPaymentsList: GetProcessPaymentsListDto[]) : Observable<PaymentProcessingResposnene> {
  //   return this.http.post<PaymentProcessingResposnene>(this.processingURl,
  //    JSON.stringify(processPaymentsList) , { headers: this.headers });
  // }
}
