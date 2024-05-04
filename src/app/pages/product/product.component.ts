import { Component, OnInit, OnChanges } from '@angular/core';
import { Image } from '../../shared/models/Image';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ProductService } from '../../shared/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
  // images?: Observable<Image[]>;

  images!: Array<Image>;
  chosenImage?: Image;

  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.firestore.collection<Image>('Images').valueChanges().pipe(
      map(images => images.filter(image => !!image))
    ).subscribe((data: Array<Image>) => {
      this.images = data;
    });
  }

  loadImage(imagePath: string): string {
    return `assets\\${imagePath}`;
  }
}