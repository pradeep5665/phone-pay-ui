import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { GetStatisticDetailsResponse } from '../model/get-statistic-details-response';

@Injectable({
  providedIn: 'root'
})
export class StatisticDetailsService {

  constructor(private http: HttpClient) { }

  baseUrl = environment.baseUrl;

  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  getStatisticDetails(startDate: string, endDate: string): Observable<GetStatisticDetailsResponse> {
    return this.http.post<GetStatisticDetailsResponse>(this.baseUrl + '/' + 'getStatisticDetails' + '/',
      { startDate: startDate, endDate: endDate},
      { headers: this.headers });
  }
}
