import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetPaymentAdviceListModel } from '../model/get-payment-advice-list-model';
import { environment } from 'src/environments/environment';
import { UpdatePaymentAdviceResponse } from '../model/update-payment-advice-response';
import { UpdatePaymentAdviceReq } from '../model/update-payment-advice-req';
import { DeletProcessAdvicePaymentReq } from '../model/delet-process-advice-payment-req';
import { DeleteProcessAdvicePaymentRes} from '../model/delete-process-advice-payment-res';
//DeleteProcessAdvicePaymentRes
@Injectable({
  providedIn: 'root'
})
export class GetPaymentAdviceService {

  constructor(private http: HttpClient) { }

  baseUrl = environment.baseUrl;

  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  getPaymentAdviceDetails(paymentAdviceType: string): Observable<GetPaymentAdviceListModel> {
    return this.http.post<GetPaymentAdviceListModel>(this.baseUrl + '/' + 'paymentAdvice' + '/',
    {paymentAdviceType: paymentAdviceType},
    { headers: this.headers });
  }

  getAllPaymentAdviceDetails(): Observable<GetPaymentAdviceListModel> {
    return this.http.post<GetPaymentAdviceListModel>(this.baseUrl + '/' + 'allPaymentAdvice' + '/',
    { headers: this.headers });
  }

  updatePaymentAdvice(schedulePaymentId: number, batchCode: string, processedBy: string, processedByEmail: string): Observable<UpdatePaymentAdviceResponse> {
    return this.http.post<UpdatePaymentAdviceResponse>(this.baseUrl + '/' + 'updatePaymentAdvice' + '/',
      { schedulePaymentId: schedulePaymentId,
        batchCode : batchCode,
        processedBy : processedBy,
        processedByEmail : processedByEmail
       },
      { headers: this.headers });
  }

  updatePaymentAdviceType(updatePaymentType: UpdatePaymentAdviceReq): Observable<UpdatePaymentAdviceResponse> {
    return this.http.post<UpdatePaymentAdviceResponse>(this.baseUrl + '/' + 'updatePaymentAdviceType' + '/',
      { schedulePaymentId: updatePaymentType.schedulePaymentId,
        adviceType: updatePaymentType.adviceType
      },
      { headers: this.headers });
  }

  deletProcessAdvicePayment(schedulePaymentId: number, deletedBy: string, removedFrom: boolean): Observable<DeleteProcessAdvicePaymentRes> {
    return this.http.post<DeleteProcessAdvicePaymentRes>(this.baseUrl + '/' + 'deletProcessAdvicePayment' + '/',
      { schedulePaymentId: schedulePaymentId,
        deletedBy: deletedBy,
        removedFrom: removedFrom
      },
      { headers: this.headers });
  }
}
