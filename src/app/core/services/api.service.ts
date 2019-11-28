import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, map, retry} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  movieApiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZmYzNjNhZDNkZjBiMGQ2ZDdhZTM5NjczZDRjNzdiMSIsInN1YiI6IjVkZGE2NjZlMGNkNDQ2MDAxOTI5YTM2OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3RSKKZKrQnOUmU1-w7EKxkSKIMkDNx32BP4r8xUnHVc';
  apiUrl = 'https://api.themoviedb.org/3/';

  constructor(private readonly _http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json; charset=utf-8',
      'Authorization': `Bearer ${this.movieApiKey}`
    })
  };

  public get(params): Observable<any> {
    return this._http
      .get(`${this.apiUrl}${params}`, this.httpOptions)
      .pipe(
        retry(3),
        map((res) => {
          return res ? res : null;
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Status returned ${error.status}, ` +
        `error occured: ${error.error}`);
    }

    return throwError(
      'Something went wrong. Try again later.');
  };
}
