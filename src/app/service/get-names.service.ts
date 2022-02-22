import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { GetNamesResponse } from '../model/get-names-response';

@Injectable({
  providedIn: 'root'
})
export class GetNamesService {
  constructor(private http: HttpClient) { }

  baseUrl = environment.baseUrl;

  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  getLastNamesList(lastName: string): Observable<GetNamesResponse> {
    return this.http.post<GetNamesResponse>(this.baseUrl + '/' + 'getLastNames' + '/',
      { lastName: lastName },
      { headers: this.headers });
  }

  getLastNamesListByFirstAndLastName(firstName: string, lastName: string): Observable<GetNamesResponse> {
    return this.http.post<GetNamesResponse>(this.baseUrl + '/' + 'getLastNamesForFirstAndLastName' + '/',
      { 
        firstName: firstName,
        lastName: lastName 
      },
      { headers: this.headers });
  }

  getFirstNamesList(firstName: string): Observable<GetNamesResponse> {
    return this.http.post<GetNamesResponse>(this.baseUrl + '/' + 'getFirstNames' + '/',
      { firstName: firstName },
      { headers: this.headers });
  }

  getFirstNamesListByFirstAndLastName(firstName: string, lastName: string): Observable<GetNamesResponse> {
    return this.http.post<GetNamesResponse>(this.baseUrl + '/' + 'getFirstNamesForFirstAndLastName' + '/',
    { 
      firstName: firstName,
      lastName: lastName 
    },
      { headers: this.headers });
  }
  getFirstAndLastNamesListForAutocomplete(name: string): Observable<GetNamesResponse> {
    return this.http.post<GetNamesResponse>(this.baseUrl + '/' + 'getFirstAndLastNamesListForAutocomplete' + '/',
      { 
        name: name
      },
      { headers: this.headers });
  }
} 
