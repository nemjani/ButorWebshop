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

  create(rate: Rate) {
    rate.id = this.afs.createId();
    return this.afs.collection<Rate>(this.collectionName).doc(rate.id).set(rate);
  }

  getOwn(userId: string) {
    return this.afs.collection<Rate>(this.collectionName, ref => ref.where('user_id', '==', userId)).valueChanges();
  }

}
