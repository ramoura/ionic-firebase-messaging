import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})

export class SettingsRepositoryService {

  constructor(
      public ngFireDB: AngularFireDatabase
  ) {
  }

  addDeviceToReceiveNotification(token: string) {
    const ref = this.ngFireDB.database.ref('push/listDevices/' + token);
    ref.set({device: 'meu', user: 'Eu'});
  }


  removeDeviceToReceiveNotification(token: string) {
    this.ngFireDB.database.ref('push/listDevices/' + token).remove();
  }
}
