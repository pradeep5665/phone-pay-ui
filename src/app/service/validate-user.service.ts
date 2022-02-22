import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ValidateUser } from '../model/validate-user.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ValidateUserService {
  baseUrl = environment.baseUrl;
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { 
  }
  
  validateUser(userId: number, phonepayToken: string): Observable<ValidateUser> {
    console.log('#########', userId, phonepayToken);
    return this.http.post<ValidateUser>(this.baseUrl + '/' + 'validateUser' + '/',
      {
        userId: userId,
        phonepayToken: phonepayToken
      },
      { headers: this.headers });
  }

}
