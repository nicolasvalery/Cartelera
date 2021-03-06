import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Movie } from '../movie';
import { MovieServiceService } from '../movie-service.service';
import { FirebaseService } from 'src/app/firebase.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Reservacion } from '../reservacion';
import { Cartelera } from '../cartelera';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {

  @Input() movie: Movie;
  reservaciones: Reservacion[];
  cartelera: Cartelera[];
  puestos: number;
  selectedMovie: Movie;

  constructor(
    private firebaseService: FirebaseService,
    private route: ActivatedRoute,
    private location: Location,
    private movieServiceService: MovieServiceService
  ) { }

  ngOnInit() {

    this.getMovie();

    this.firebaseService.getReservaciones().subscribe(data => {
      this.reservaciones = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Reservacion;
      });
    });

    this.firebaseService.getCartelera().subscribe(data => {
      this.cartelera = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Cartelera;
      });
    });

  }

  getMovie(): void {
    const Id = this.route.snapshot.paramMap.get('Id');
    this.movieServiceService.getMovie(Id)
      .subscribe(movie => this.movie = movie);
  }

  create(reservaciones: Reservacion) {
    this.firebaseService.createReservaciones(reservaciones);
  }

  onSelect(movie: Movie): void {
    this.selectedMovie = movie;
  }

}
