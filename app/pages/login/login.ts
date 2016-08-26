import {Component, ViewChild } from '@angular/core';
import {Http} from '@angular/http';
import {HomePage} from '../home/home';
import {TabsPage} from '../tabs/tabs';
import {AboutPage} from '../about/about';
import {ContactPage} from '../contact/contact';
import {NavController, Alert, Platform} from 'ionic-angular';
import {LoginService} from '../../services/loginservice';
import {SignupPage} from '../signup/signup';

@Component({
  templateUrl: 'build/pages/login/login.html',
  providers : [LoginService]
})
export class LoginPage {
  username: any;
  public foundRepos;
  pass: any;
  submitted = false;
  constructor(public navCtrl: NavController, private platform: Platform, private logins: LoginService) {
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
      console.log(this.username);
      console.log(this.pass);
      if(this.username=='' || this.pass==''){
        alert("Lengkapi Data Login Anda");
      }
      else{
      this.logins.getLogin(this.username).subscribe(
          data => {
              this.foundRepos = data.json();
              if(this.foundRepos[0]!=null){
                  console.log(this.foundRepos[0]);
                  this.navCtrl.setRoot(HomePage);
              }else{
                alert("Maaf, email "+this.username+" belum terdaftar");
              }

          },
          err => console.error(err),
          () => console.log('getRepos completed')
      );
      }
  }
  SignUp() {
 this.navCtrl.setRoot(SignupPage);
  }


}
