import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'; // ✅ Importar IonicModule
import { PhotoService } from '../services/photo.service';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';


@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, IonicModule, AngularFireStorageModule],  // ✅ Agregar IonicModule aquí
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
})
export class GalleryPage {
  photos: any[] = [];

  constructor(private photoService: PhotoService) {}

  ngOnInit() {
    this.photoService.getPhotos().subscribe(photos => {
      this.photos = photos;
    });
  }

  addPhoto() {
    this.photoService.takePhoto();
  }
}
