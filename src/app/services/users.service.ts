import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../models/user';

const apiUrl = "http://localhost:56491/Api/Users";

@Injectable({
  providedIn: 'root'
})
export class UsersService {


  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(apiUrl)
      .pipe(catchError(this.handleError));
      
  }



  
  getUsersPromis() {
    return this.http
      .get(apiUrl)
      .pipe(
        map((data: any) => <User[]>data),
        catchError(this.handleError)
      )
      .toPromise();
  }

  // private handleError(error: HttpErrorResponse) {
  //   console.error(error);
  //   let msg = `Error status code ${error.status} at ${error.url}`;
  //   return throwError(msg);
  // }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError(`Something bad happened; please try again later.
                        status code ${error.status}`);
  }




}


