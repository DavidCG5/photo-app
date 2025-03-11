import { Component } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { PhotosService } from '../services/photos.service';
import { PhotoI } from '../services/models/photos.models';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
  standalone: false,
})
export class GalleryPage {
  photos: PhotoI[] = [];

  constructor(
    private firebaseService: FirebaseService,
    private photosService: PhotosService
  ) {
    this.loadPhotos();
  }

  loadPhotos() {
    this.firebaseService
      .getCollectionChanges<PhotoI>('fotos')
      .subscribe((data) => {
        if (data) {
          this.photos = data;
        }
      });
  }

  async takePhoto() {
    await this.photosService.addNewPhoto();
    this.loadPhotos();
  }
}
