import {Component, ViewChild } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {HomePage} from '../home/home';
import {TabsPage} from '../tabs/tabs';
import {AboutPage} from '../about/about';
import {ContactPage} from '../contact/contact';
import {NavController, AlertController, Platform} from 'ionic-angular';
import {SignupPage} from '../signup/signup';
import {LocationTracker} from '../../providers/location-tracker/location-tracker';
import 'rxjs/add/operator/toPromise';
import { BioPage } from '../../pages/bio/bio';

@Component({
  templateUrl: 'build/pages/login/login.html',
  providers : [LocationTracker]
})
export class LoginPage {
  login: any = {};
  username: any;
  public foundRepos;
  pass: any;
  submitted = false;
  constructor(public http : Http, public alertController: AlertController, public navCtrl: NavController, private platform: Platform, private tracker: LocationTracker) {
    //this.tracker.logOut();
  }

  getLogin()
  {
  	console.log(this.login);
  	let url= this.tracker.url + "Users/login";
  	let headers = new Headers({ 'Content-Type': 'application/json' });
  	let options = new RequestOptions({ headers: headers });

  	let postBodyLogin: any = {
  	  "username": this.login.email,
  	  "password": this.login.password
  	};

  	this.http.post(url, postBodyLogin, options)
  			.subscribe(data =>
  			{
  				let body = data.json();
  				console.log(body);

  				this.tracker.logedin(this.login.email, body);
          console.log(this.tracker.nik);
          let headers = new Headers({ 'Content-Type': 'application/json' });
          let options = new RequestOptions({ headers: headers });
          this.http.get("http://107.167.177.146/api-public110/api/publiks?filter[where][email]="+this.login.email+"&access_token=" + body.id, options)
              .subscribe((data) =>
              {
                let items = data.json();
                console.log(items);
                console.log(items[0].email);console.log(items[0].telp);
                if(items[0].telp==null || items[0].telp=='' ){
                  this.navCtrl.setRoot(BioPage);
                }else{
                  this.navCtrl.setRoot(HomePage);
                }
              },
              error =>
              {
                let alert = this.alertController.create({
                  title: 'Peringatan',
                  subTitle: 'Pengambilan data gagal. Cek koneksi internet',
                  buttons: ['OK']
                });
                alert.present();
              });

  			},
  			error =>
  			{
  				this.showAlert();
  				console.log(error);
  			});

  }

  showAlert() {
    let alert = this.alertController.create({
      title: 'Perhatian',
      subTitle: 'Login Gagal, mungkin user atau passwordnya keliru atau tidak ada koneksi internet',
      buttons: ['OK']
    });
    alert.present();
  }

  SignUp() {
    this.navCtrl.setRoot(SignupPage);
  }


}
