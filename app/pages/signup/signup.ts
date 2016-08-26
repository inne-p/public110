import {Component, ViewChild } from '@angular/core';
import {Http} from '@angular/http';
import {HomePage} from '../home/home';
import {AboutPage} from '../about/about';
import {ContactPage} from '../contact/contact';
import {NavController, Alert, Platform} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/signup/signup.html'
})
export class SignupPage {
  login: any = {};
  submitted = false;
  constructor(public navCtrl: NavController, private platform: Platform) {
    this.platform.ready().then(() => {
            /*var networkState = navigator.connection.type;
            var states = {};
            states[Connection.UNKNOWN]  = 'Unknown connection';
            states[Connection.ETHERNET] = 'Ethernet connection';
            states[Connection.WIFI]     = 'WiFi connection';
            states[Connection.CELL_2G]  = 'Cell 2G connection';
            states[Connection.CELL_3G]  = 'Cell 3G connection';
            states[Connection.CELL_4G]  = 'Cell 4G connection';
            states[Connection.CELL]     = 'Cell generic connection';
            states[Connection.NONE]     = 'No network connection';
            let alert = Alert.create({
                title: "Connection Status",
                subTitle: states[networkState],
                buttons: ["OK"]
            });
            this.navCtrl.present(alert);*/
        });
  }

  loginPublic(){
      console.log(this.login);
      alert("hahahaha");
  }
}
