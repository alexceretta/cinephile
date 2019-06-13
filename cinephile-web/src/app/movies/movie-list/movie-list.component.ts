import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';
import { ConfigurationService } from 'src/app/configuration/configuration-service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  movies: Movie[] = [];
  imagesUrl: string;

  constructor(private movieService: MovieService, private configurationService: ConfigurationService) { }

  ngOnInit() {
    this.getUpcomingMovies();
    this.imagesUrl = this.configurationService.ApiConfiguration.images.base_url;
  }

  getUpcomingMovies(): void {
    this.movieService.getUpcoming()
      .subscribe(movies => this.movies = movies.results);
  }

}
