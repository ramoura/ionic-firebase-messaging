import {Injectable} from '@angular/core';

import {Plugins, PushNotification, PushNotificationActionPerformed, PushNotificationToken} from '@capacitor/core';
import {FCM} from '@capacitor-community/fcm';
import {SettingsRepositoryService} from './settings-repository-service';
import {Platform} from '@ionic/angular';

const {PushNotifications} = Plugins;
const fcm = new FCM();


@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {

  constructor(
      private platform: Platform,
      private  repo: SettingsRepositoryService
  ) {
  }

  register() {
    console.log(this.platform.platforms());
    if (this.platform.is('hybrid')) {
      PushNotifications.requestPermission().then(result => {
        if (result.granted) {
          PushNotifications.register();
        }
      });

      PushNotifications.addListener('registration',
          (token: PushNotificationToken) => {
            this.repo.addDeviceToReceiveNotification(token.value);
          }
      );

      PushNotifications.addListener('registrationError',
          (error: any) => {
            alert('Error on registration: ' + JSON.stringify(error));
          }
      );

      PushNotifications.addListener('pushNotificationReceived',
          (notification: PushNotification) => {
            alert('Push received: ' + JSON.stringify(notification));
          }
      );

      PushNotifications.addListener('pushNotificationActionPerformed',
          (notification: PushNotificationActionPerformed) => {
            alert('Push action performed: ' + JSON.stringify(notification));
          }
      );
    }
  }

  unregister() {
    if (this.platform.is('hybrid')) {
      fcm.getToken().then(token => {
        this.repo.removeDeviceToReceiveNotification(token.token);
        PushNotifications.removeAllListeners();
        fcm.deleteInstance();
      });
    }
  }
}
