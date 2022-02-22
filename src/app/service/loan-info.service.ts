import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoanInfoModel } from '../model/loan-info-model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()

export class LoanInfoService {

  constructor(private http: HttpClient) { }

  baseUrl = environment.baseUrl;
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  getLoanInfo(loanNumbers: number[]): Observable<LoanInfoModel> {
    return this.http.post<LoanInfoModel>(this.baseUrl + '/' + 'getLoanInfo' + '/',
      { loanNumbers: loanNumbers },
      { headers: this.headers });
  }

}
