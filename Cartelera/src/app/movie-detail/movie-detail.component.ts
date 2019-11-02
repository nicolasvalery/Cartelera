import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Movie } from '../movie';
import { MovieServiceService } from '../movie-service.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {

  @Input() movie: Movie;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private movieServiceService: MovieServiceService
  ) { }

  ngOnInit() {
    this.getMovie();
  }

  getMovie(): void {
    const Id = this.route.snapshot.paramMap.get('Id');
    this.movieServiceService.getMovie(Id)
      .subscribe(movie => this.movie = movie);
  }

}
