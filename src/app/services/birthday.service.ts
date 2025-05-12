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
  private url = `https://api.jsonbin.io/v3/b/${environment.jsonBin.id}`;
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'X-Master-Key': environment.jsonBin.key,
  });

  fetchAll(): Observable<Colleague[]> {
    return this.http
      .get<JsonBinResponse>(this.url, { headers: this.headers })
      .pipe(map((resp) => resp.record || []));
  }

  saveAll(colleagues: Colleague[]): Observable<void> {
    return this.http.put<void>(this.url, colleagues, { headers: this.headers });
  }

  addBirthday(col: Colleague): Observable<void> {
    return this.fetchAll().pipe(
      take(1),
      switchMap((existing) => this.saveAll([...existing, col]))
    );
  }
}
