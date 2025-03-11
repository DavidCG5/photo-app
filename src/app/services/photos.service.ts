import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import {
  Firestore,
  collection,
  addDoc,
  serverTimestamp,
} from '@angular/fire/firestore';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class PhotosService {
  private _storage: Storage | null = null;

  constructor(private firestore: Firestore, private storage: Storage) {
    this.init();
  }

  async init() {
    this._storage = await this.storage.create();
  }

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

      // Guardar en Firestore
      const photosCollection = collection(this.firestore, 'fotos');
      await addDoc(photosCollection, newPhoto);

      // Guardar localmente
      let storedPhotos = (await this._storage?.get('photos')) || [];
      storedPhotos.unshift(newPhoto);
      await this._storage?.set('photos', storedPhotos);
      console.log("Fotos guardadas localmente:", storedPhotos); // 👈 Ver en consola

    }
  }

  async getLocalPhotos() {
    return (await this._storage?.get('photos')) || [];
  }
}
