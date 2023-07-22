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

  // ------------ User ---------------

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

  getBalance(wallet: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}/users/balance/${wallet}`);
  }

  // ------------ End user ---------------

  // ------------ Transaction ---------------

  addTransaction(transaction: Transaction): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}/Transactions`, JSON.stringify(transaction));
  }

  getTransactions(q: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}/Transactions?q=${q}`);
  }

  // ------------ End transaction -------------


  checkTokenValidity(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}/auth/verify`);
  }


    

}
