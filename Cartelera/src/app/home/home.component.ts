import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie';
import { MovieServiceService } from '../movie-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  selectedMovie: Movie;

  lista: Movie[];

  constructor(private movieServiceService: MovieServiceService) { }

  ngOnInit() {
    this.getMovies();
  }

  onSelect(movie: Movie): void {
    this.selectedMovie = movie;
  }

  getMovies(): void {
    this.lista = this.movieServiceService.getMovies();
  }

}
