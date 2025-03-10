import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import {
  Firestore,
  collection,
  addDoc,
  serverTimestamp,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class PhotosService {
  constructor(private firestore: Firestore) {}

  async addNewPhoto() {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 100,
    });

    if (capturedPhoto.base64String) {
      const newPhoto = {
        id: new Date().getTime().toString(),
        ImageBase64: `data:image/jpeg;base64,${capturedPhoto.base64String}`,
        createdAt: serverTimestamp(),
      };

      const photosCollection = collection(this.firestore, 'fotos');
      await addDoc(photosCollection, newPhoto);
    }
  }
}
