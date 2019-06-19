import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

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
    let id = +this.route.snapshot.paramMap.get('id');
    this.movieService.getMovie(id)
      .subscribe(movie => this.movie = movie);
  }

}
