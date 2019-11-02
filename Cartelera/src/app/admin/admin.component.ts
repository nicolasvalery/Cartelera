import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie';
import { MovieServiceService } from '../movie-service.service';
import { FirebaseService } from 'src/app/firebase.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Reservacion } from '../reservacion';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  reservaciones: Reservacion[];

  constructor(
    private firebaseService: FirebaseService,
    private movieServiceService: MovieServiceService) { }

  ngOnInit() {

    this.firebaseService.getReservaciones().subscribe(data => {
      this.reservaciones = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Reservacion;
      });
    });

  }

}
