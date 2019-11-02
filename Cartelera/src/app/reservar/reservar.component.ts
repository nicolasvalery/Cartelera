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
  selector: 'app-reservar',
  templateUrl: './reservar.component.html',
  styleUrls: ['./reservar.component.scss']
})
export class ReservarComponent implements OnInit {

  @Input() movie: Movie;
  reservaciones: Reservacion[];
  cartelera: Cartelera[];
  reservacion: Reservacion;

  constructor(
    private route: ActivatedRoute,
    private firebaseService: FirebaseService,
    private movieServiceService: MovieServiceService,
  ) { }

  ngOnInit() {

    this.getMovie();

    this.reservacion.pelicula = this.movie.Title;
    this.reservacion.nombre = 'test';
    this.reservacion.entrada = 1;

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

  reservar(): void{
  }


}
