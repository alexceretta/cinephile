import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MovieSearch } from '../movie-search';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { MovieService } from '../movie.service';

@Component({
	selector: 'app-search-bar',
	templateUrl: './search-bar.component.html',
	styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

	// Form controls
	searchForm: FormGroup;
	searchTerm = new FormControl();
	// Search result for auto complete
	searchResult: MovieSearch[] = [];
	isLoading = false;

	constructor(private movieService: MovieService) { }

	itemSelected(event: any) {
		console.log(event.option);
	}

	ngOnInit() {
		this.searchTerm.valueChanges.pipe(
			debounceTime(300),
			tap(() => this.isLoading = true),
			switchMap((value) => {
				return value === '' ? [] : this.movieService.search(value, 1)
					.pipe(finalize(() => this.isLoading = false));
			})
		).subscribe(movies => this.searchResult = movies.results);
	}

	displaySelection(movie: MovieSearch) {
		if (movie) { return movie.title; }
	}
}
