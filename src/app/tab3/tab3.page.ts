import {Component, OnInit} from '@angular/core';

import {SettingsRepositoryService} from '../services/settings-repository-service';
import {Plugins, PushNotification, PushNotificationActionPerformed, PushNotificationToken} from '@capacitor/core';
import {Platform} from '@ionic/angular';
import {FCM} from '@capacitor-community/fcm';

const {PushNotifications} = Plugins;
const fcm = new FCM();


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  computerFirst: boolean;

  constructor(
      private platform: Platform,
      public  repo: SettingsRepositoryService
  ) {
  }

  async ngOnInit() {
    const settings = JSON.parse(localStorage.getItem('settings')) || {};
    this.computerFirst = settings.pushNotification || false;
  }

  toggleChange() {
    localStorage.setItem('settings', JSON.stringify({pushNotification: this.computerFirst}));
    if (this.computerFirst) {

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
    } else {
      fcm.getToken().then(token => {
        this.repo.removeDeviceToReceiveNotification(token.token);
        PushNotifications.removeAllListeners();
        fcm.deleteInstance();
      });
    }
  }

}
