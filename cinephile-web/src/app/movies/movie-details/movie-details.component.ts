import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MovieService } from '../movie.service';
import { ConfigurationService } from 'src/app/configuration/configuration-service';
import { Movie } from '../movie';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  movie: Movie;
  imagesUrl: string;

  constructor(private route: ActivatedRoute, private movieService: MovieService, private configurationService: ConfigurationService) { }

  ngOnInit() {

    this.getMovie();
    this.imagesUrl = this.configurationService.ApiConfiguration.images.base_url;
  }

  getMovie(): void {
    this.route.paramMap.subscribe(routeParams => {
      this.movieService.getMovie(+routeParams.get('id'))
        .subscribe(movie => this.movie = movie);
    });
  }

  getMovieBackdrop(): string {
    return this.imagesUrl + 'w1280' + this.movie.backdrop_path;
  }

}
