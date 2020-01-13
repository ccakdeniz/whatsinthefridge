import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { rapidApiKeys } from '../app/rapidApiKeys';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  apiUrl = 'https://tasty.p.rapidapi.com';

  GetRecipes(ingredients, from=1) {
    return this.http.get(this.apiUrl + '/recipes/list?q=' + ingredients + '&sizes=20&from=' + from, {
      headers: {
        "x-rapidapi-host": "tasty.p.rapidapi.com",
        "x-rapidapi-key": rapidApiKeys.apiKey
      }
    })
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      )
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `${error.statusText}. ${error.error.title}`;
    }
    return throwError(errorMessage);
  }
}
