import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { User } from '../models/user.model';
import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private baseUrl = 'https://localhost:7018';

  constructor(private http: HttpClient) { }

  getUser( wallet : string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}/users/${wallet}`)
  }

  updateUser( user : User | null): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.baseUrl}/users/${user!.wallet}`, JSON.stringify(user))
  }

  logInRegister(Wallet : string): Observable<ApiResponse> {
    let body = { Wallet };
    return this.http.post<ApiResponse>(`${this.baseUrl}/users/auth`, JSON.stringify(body));
  }

  checkTokenValidity(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}/auth/verify`);
  }

  addTransaction(transaction: Transaction): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}/Transactions`, JSON.stringify(transaction));
  }

  getBalance(wallet: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}/Users/balance/${wallet}`);
  }

}
