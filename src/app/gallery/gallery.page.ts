import { Component } from '@angular/core';
import {PhotosService} from './../services/photos.service'

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
  standalone: false,
})
export class GalleryPage {

  photos: string[] = [];

  constructor(
    private photosService: PhotosService
  ) { 
    this.photos = this.photosService.photos;
  }


  async takePhoto(){
    await this.photosService.addNewPhoto();
  }
}
