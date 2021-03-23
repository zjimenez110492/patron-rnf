import { Result } from './../../../models/result.model';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';

const COLECCION_RESULTADOS: string = '/resultados';
@Injectable({
  providedIn: 'root',
})
export class ResultsService {
  result:Result;
  private resultCollection: AngularFirestoreCollection<Result>;
  private resultDB: AngularFireList<Result>;
  public evento: Element;
  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
    private db: AngularFireDatabase
  ) {
    this.resultDB = this.db.list(COLECCION_RESULTADOS, (ref) =>
      ref.orderByChild('proceso')
    );
  }
  public tareaCloudStorage(nombreArchivo: string, datos: any) {
    return this.storage.upload(nombreArchivo, datos);
  }

  //Referencia del archivo
  public referenciaCloudStorage(nombreArchivo: string) {
    return this.storage.ref(nombreArchivo);
  }
  addResult(result: Result) {
    return this.resultDB.push(result);
  }
  getResults(): Observable<Result[]> {
    return this.resultDB.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((c) => ({
          $key: c.payload.key,
          ...c.payload.val(),
        }));
      })
    );
  }

}
