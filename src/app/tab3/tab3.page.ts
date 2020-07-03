import {Component, OnInit} from '@angular/core';
import {PushNotificationService} from '../services/push-notification-service';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  computerFirst: boolean;

  constructor(
      public pushNotification: PushNotificationService
  ) {
  }

  async ngOnInit() {
    const settings = JSON.parse(localStorage.getItem('settings')) || {};
    this.computerFirst = settings.pushNotification || false;
  }

  toggleChange() {
    localStorage.setItem('settings', JSON.stringify({pushNotification: this.computerFirst}));
    if (this.computerFirst) {
      this.pushNotification.register();
    } else {
      this.pushNotification.unregister();
    }
  }

}
