import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CheckStopFileExistanceResponse } from '../model/check-stop-file-existance-response';

@Injectable({
  providedIn: 'root'
})
export class ChekStopFileExistanceService {

  constructor(private http: HttpClient) { }

  baseUrl = environment.baseUrl;

  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  isLoanAccountInStopFile(loanNumber: number): Observable<CheckStopFileExistanceResponse> {
    return this.http.post<CheckStopFileExistanceResponse>(this.baseUrl + '/' + 'isLoanExistStopFile' + '/' + loanNumber,    
      { headers: this.headers });
  }
}
