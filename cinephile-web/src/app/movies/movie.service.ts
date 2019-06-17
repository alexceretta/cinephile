import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { SearchResult } from '../search-result';
import { MovieSearch } from './movie-search';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class MovieService {

    private moviesUrl = 'http://localhost:5000/api/movies';

    constructor(private http: HttpClient) { }

    getUpcoming(page: number): Observable<SearchResult<MovieSearch>> {
        return this.http.get<SearchResult<MovieSearch>>(`${this.moviesUrl}/upcoming?page=${page}`);
    }
}
