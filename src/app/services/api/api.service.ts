import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Board } from '../../models/boards.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl = '../../assets/data.json';

  constructor(private http: HttpClient) { }

  getData(): Observable<Board[]> {
    return this.http.get<Board[]>(this.apiUrl);
  }
}
