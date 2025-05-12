import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface Colleague {
  name: string;
  surname: string;
  birthdate: string;
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
    return this.http.get<Colleague[]>(this.url, {
      headers: this.headers,
    });
  }

  saveAll(colleagues: Colleague[]): Observable<void> {
    return this.http.put<void>(this.url, colleagues, { headers: this.headers });
  }

  addBirthday(col: Colleague): Observable<void> {
    return this.fetchAll().pipe(
      take(1),
      switchMap((colleaguesArray) => {
        const updated = [...colleaguesArray, col];
        return this.saveAll(updated);
      })
    );
  }
}
