import { Injectable, inject } from '@angular/core';

import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { addDoc } from 'firebase/firestore';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private firestore: Firestore = inject(Firestore);

  //base de datos
  getCollectionChanges<tipo>(path: string) {
    const RefCollection = collection(this.firestore, path);
    return collectionData(RefCollection) as Observable<tipo[]>;
  }
}
