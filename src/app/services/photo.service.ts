import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { finalize } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  constructor(
    private storage: AngularFireStorage,
    private firestore: AngularFirestore
  ) {}

  async takePhoto() {
    try {
      // Capturar la foto
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera,
        quality: 90
      });
  
      // Verificar si la imagen se tomó correctamente
      if (!photo.base64String) {
        console.error("Error: No se pudo capturar la imagen.");
        return;
      }
  
      // Nombre único para la imagen
      const fileName = `photos/${uuidv4()}.jpg`;
      const fileRef = this.storage.ref(fileName);
      
      // Subir imagen a Firebase Storage
      const uploadTask = this.storage.upload(fileName, `data:image/jpeg;base64,${photo.base64String}`);
  
      // Obtener URL de descarga una vez subida la imagen
      uploadTask.snapshotChanges().pipe(
        finalize(async () => {
          try {
            const downloadURL = await lastValueFrom(fileRef.getDownloadURL());
            console.log("✅ Foto subida correctamente:", downloadURL);
  
            // Guardar en Firestore
            await this.firestore.collection('photos').add({ url: downloadURL });
            console.log("✅ URL guardada en Firestore");
          } catch (error) {
            console.error("❌ Error obteniendo URL:", error);
          }
        })
      ).subscribe();
    } catch (error) {
      console.error("❌ Error tomando la foto:", error);
    }
  }

  getPhotos() {
    return this.firestore.collection('photos').valueChanges();
  }
}
