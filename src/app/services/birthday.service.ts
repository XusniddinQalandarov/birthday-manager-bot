import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, switchMap, take } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Colleague {
  name: string;
  surname: string;
  birthdate: string;
}

interface JsonBinResponse {
  record: Colleague[];
}

@Injectable({ providedIn: 'root' })
export class BirthdayService {
  private http = inject(HttpClient);
  private apiUrl = '/api/colleagues';

  fetchAll(): Observable<Colleague[]> {
    return this.http.get<Colleague[]>(this.apiUrl);
  }
  saveAll(cols: Colleague[]): Observable<void> {
    return this.http.post<void>(this.apiUrl, { colleagues: cols });
  }

  addBirthday(col: Colleague): Observable<void> {
    return this.fetchAll().pipe(
      take(1),
      switchMap((arr) => this.saveAll([...arr, col]))
    );
  }
}
