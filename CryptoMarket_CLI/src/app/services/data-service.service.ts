import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private baseUrl = 'https://localhost:7018';

  constructor(private http: HttpClient) { }

  getUser( wallet : string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}/users/${wallet}`)
  }

  updateUser( user : User): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.baseUrl}/users/${user.wallet}`, JSON.stringify(user))
  }

  logInRegister(Wallet : string): Observable<ApiResponse> {
    let body = { Wallet };
    return this.http.post<ApiResponse>(`${this.baseUrl}/users/auth`, JSON.stringify(body));
  }



}
