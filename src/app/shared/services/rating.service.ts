import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Rate } from '../models/Rate';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  collectionName = 'Rates';

  constructor(private afs: AngularFirestore) { }

  //CRUD:

  create(user: Rate) {
    return this.afs.collection<Rate>(this.collectionName).doc(user.id).set(user);
  }

  getAll() {

  }

  update() {

  }

  delete() {

  }
}
