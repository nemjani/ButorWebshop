import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, from } from 'rxjs';
import { Image } from '../models/Image';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  collectionName = 'Images';

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) { }

  // loadImageMeta(metaUrl: string): Observable<Array<Image>> {
  //   return this.afs.collection<Image>(this.collectionName).valueChanges();
  // }

  // loadImage(imageUrl: string): Observable<string> {
  //   return from(this.storage.ref(imageUrl).getDownloadURL());
  // }
  loadImage(imageUrl: string) {
    return this.storage.ref(imageUrl).getDownloadURL();
  }

  getAll(): Promise<Image[]> {
    return new Promise((resolve, reject) => {
      this.afs.collection<Image>(this.collectionName).get().toPromise()
        .then(querySnapshot => {
          if (!querySnapshot!.empty) {
            const images: Image[] = [];
            querySnapshot!.forEach(doc => {
              images.push(doc.data() as Image);
            });
            resolve(images);
          } else {
            // Nincsenek dokumentumok az eredményben
            resolve([]);
          }
        })
        .catch(error => reject(error));
    });
  }

  delete(imageId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.afs.collection<Image>(this.collectionName).doc(imageId).delete()
        .then(() => resolve())
        .catch(error => reject(error));
    });
  }



}
