import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Movie {
  id: number;
  title: string;
  results: any;
  total_pages: number;
  total_results: number;
  release_date: string;
  overview: string;
  vote_average: number;
  poster_path: string;


};


@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  getPopularMovies(page = 1): Observable <Movie> {
    return this.http.get<Movie>
    (`${environment.baseUrl}/movie/popular?api_key=${environment.apiKey}&page=${page}`);
    
  }

  getMovieDetails(id: string) {
    return this.http.get(
      `${environment.baseUrl}/movie/${id}?api_key=${environment.apiKey}`
      );
  }
}
