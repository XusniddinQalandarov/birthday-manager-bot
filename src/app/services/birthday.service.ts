// src/app/services/birthday.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Colleague {
  name: string;
  surname: string;
  birthdate: string; // YYYY-MM-DD
}

@Injectable({ providedIn: 'root' })
export class BirthdayService {
  private http = inject(HttpClient);
  private url = `https://api.jsonbin.io/v3/b/${environment.jsonBin.id}`;
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'X-Master-Key': environment.jsonBin.key,
  });

  /** GET current list from JSONBin */
  fetchAll(): Observable<{ record: Colleague[] }> {
    return this.http.get<{ record: Colleague[] }>(this.url, {
      headers: this.headers,
    });
  }

  /** PUT updated list to JSONBin */
  saveAll(colleagues: Colleague[]): Observable<void> {
    return this.http.put<void>(this.url, colleagues, { headers: this.headers });
  }
}
