import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';
import { ConfigurationService } from 'src/app/configuration/configuration-service';
import { MovieSearch } from '../movie-search';
import { SearchResult } from 'src/app/search-result';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  movies: MovieSearch[] = [];
  page = 1;
  imagesUrl: string;

  constructor(private movieService: MovieService, private configurationService: ConfigurationService) { }

  ngOnInit() {
    this.getUpcomingMovies();
    this.imagesUrl = this.configurationService.ApiConfiguration.images.base_url;
  }

  getUpcomingMovies(): void {
    this.movieService.getUpcoming(this.page)
      .subscribe(movies => this.onSuccess(movies.results));
  }

  onSuccess(movies: MovieSearch[]) {
    if (movies !== undefined) {
      movies.forEach((movie: MovieSearch) => {
        this.movies.push(movie);
      });
    }
  }

  onScroll() {
    console.log('Scrolled');
    this.page = this.page + 1;
    this.getUpcomingMovies();
  }

}
