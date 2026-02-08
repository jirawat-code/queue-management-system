import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QueueService {

  private apiUrl = 'https://localhost:7232/api/queue';

  constructor(private http: HttpClient) { }

  generateQueue(): Observable<any> {
    return this.http.post(`${this.apiUrl}/generate`, {});
  }
  getCurrent(): Observable<any> {
    return this.http.post(`${this.apiUrl}/current`, {});
  }
  resetQueue(): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset`, {});
  }
}