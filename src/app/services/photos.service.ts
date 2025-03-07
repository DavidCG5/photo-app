import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource} from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {
  photos: string[] = [];

  constructor() { }

  async addNewPhoto() {
    const capturedPhoto = await Camera.getPhoto({
          resultType: CameraResultType.Uri,
          source: CameraSource.Camera,
          quality: 100
        });
        if(capturedPhoto.webPath){
          this.photos.unshift(capturedPhoto.webPath);
        }
  }
}