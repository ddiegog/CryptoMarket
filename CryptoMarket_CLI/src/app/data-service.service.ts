import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from './models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private baseUrl = 'https://localhost:7018';

  constructor(private http: HttpClient) { }

  getUser( wallet : string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}/users/${wallet}`)
  }

}
