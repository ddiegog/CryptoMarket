import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private baseUrl = 'https://localhost:7018';

  constructor(private http: HttpClient) { }

  //TEST
  getUser( wallet : string): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/${wallet}`)
  }

}
