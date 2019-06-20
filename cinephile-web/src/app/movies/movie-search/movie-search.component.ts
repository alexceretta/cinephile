import { Component, OnInit } from '@angular/core';
import { MovieSearch } from '../movie-search';
import { MovieService } from '../movie.service';
import { ConfigurationService } from 'src/app/configuration/configuration-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent implements OnInit {

  movies: MovieSearch[] = [];
  page = 1;
  imagesUrl: string;

  constructor(private route: ActivatedRoute, private movieService: MovieService, private configurationService: ConfigurationService) { }

  ngOnInit() {
    this.getMovies(true);
    this.imagesUrl = this.configurationService.ApiConfiguration.images.base_url;
  }

  getMovies(refresh: boolean): void {

    if (refresh) {
      this.movies = [];
    }

    this.movieService.search(this.route.snapshot.queryParamMap.get('query'), this.page)
      .subscribe(movies => this.onSuccess(movies.results));
  }

  onSuccess(movies: MovieSearch[]) {
    if (movies !== undefined) {
      movies.forEach((movie: MovieSearch) => {
        this.movies.push(movie);
      });
    }

    console.log(this.movies);
  }

  onScroll() {
    console.log('Scrolled:' + this.page);
    this.page = this.page + 1;
    this.getMovies(false);
  }

}
