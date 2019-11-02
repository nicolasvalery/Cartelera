import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Reservacion } from './reservacion';
import { Cartelera } from './cartelera';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: AngularFirestore) { }

  getReservaciones() {
    return this.firestore.collection('reservaciones').snapshotChanges();
  }

  getCartelera() {
    return this.firestore.collection('cartelera').snapshotChanges();
  }

  updateCartelera(cartelera: Cartelera) {
    delete cartelera.nombre;
    this.firestore.doc('reservaciones/' + cartelera.nombre).update(cartelera);
  }

  createReservaciones(reservacion: Reservacion) {
    return this.firestore.collection('reservaciones').add(reservacion);
  }

  updateReservaciones(reservacion: Reservacion) {
    delete reservacion.nombre;
    this.firestore.doc('reservaciones/' + reservacion.nombre).update(reservacion);
  }

  deleteReservaciones(reservacionNombre: string) {
    this.firestore.doc('reservaciones/' + reservacionNombre).delete();
  }

}
