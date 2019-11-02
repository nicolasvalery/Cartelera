import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Movie } from './movie';
import { Peliculas } from './database';

@Injectable({
  providedIn: 'root'
})
export class MovieServiceService {

  constructor() { }

  getMovies(): Movie[] {
    return Peliculas;
  }

  getMovie(Id: string): Observable<Movie> {
    return of(Peliculas.find(movie => movie.Id === Id));
  }

}
