import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { Image } from '../../shared/models/Image';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  displayedColumns: string[] = ['image', 'name', 'price', 'deleteIcon'];
  images: Image[] = [];
  dataSource: MatTableDataSource<Image> | undefined;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getAll().then(images => {
      this.images = images;
    }).catch(error => {
      console.error('Error fetching images:', error);
    });
  }

  loadImage(imagePath: string): string {
    return `assets\\${imagePath}`;
  }

  deleteImage(imageId: string) {
    this.productService.delete(imageId).then(() => {
      console.log('Image deleted successfully');
      // Frissítsd az images tömböt, hogy a törlés azonnal látható legyen
      this.images = this.images.filter(image => image.id !== imageId);
    }).catch(error => {
      console.error('Error deleting image:', error);
    });
  }

  isEvenRow(image: any): boolean {
    return this.images.indexOf(image) % 2 === 0;
  }

}
