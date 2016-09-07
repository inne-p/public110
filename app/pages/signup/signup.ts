import {Component, ViewChild } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {HomePage} from '../home/home';
import {AboutPage} from '../about/about';
import {LoginPage} from '../login/login';
import {ContactPage} from '../contact/contact';
import { LocationTracker } from '../../providers/location-tracker/location-tracker';
import {NavController, AlertController, Platform} from 'ionic-angular';
import 'rxjs/add/operator/toPromise';

@Component({
  templateUrl: 'build/pages/signup/signup.html'
})
export class SignupPage {
  signup: any = {};
  public nik: any = '';
  submitted = false;
  constructor(public tracker: LocationTracker, public http:Http, public alertController: AlertController, public navCtrl: NavController, private platform: Platform) {

  }

  signupPublic(){
      console.log(this.signup);
      alert("hahahaha");
  }

  showAlert() {
    let alert = this.alertController.create({
      title: 'Perhatian',
      subTitle: 'Registrasi Gagal, coba nomor yang lain atau cek koneksi internet',
      buttons: ['OK']
    });
    alert.present();
  }

  addUserDetail()
  {
  console.log(this.signup);
	let url= this.tracker.url + "publiks";
	let headers = new Headers({ 'Content-Type': 'application/json' });
	let options = new RequestOptions({ headers: headers });
	let postBodyLogin: any = {
	  "nama": this.signup.nama,
	  "alamat": this.signup.alamat,
	  "realm": "public110",
    "username": this.signup.email,
    "password" : this.signup.pass,
	  "email": this.signup.email,
    "credentials": {},
    "challenges": {},
	  "emailVerified": true,
	  "status": "active",
	  "created": new Date().toJSON(),
	  "lastUpdated": new Date().toJSON()
	};
	this.http.post(url, postBodyLogin, options)
			.subscribe(() =>
			{
				console.log(this.signup);
			},
			error =>
			{
				this.handleError(error);
			});
  }

  getRegister()
  {
  console.log(this.signup);
	let url= this.tracker.url + "Users";
	let headers = new Headers({ 'Content-Type': 'application/json' });
	let options = new RequestOptions({ headers: headers });
	let postBodyLogin: any = {
	  "realm": "public110",
	  "username": this.signup.email,
	  "password": this.signup.pass,
	  "credentials": {},
	  "challenges": {},
	  "email": this.signup.email,
	  "emailVerified": true,
	  "status": "active",
	  "created": new Date().toJSON(),
	  "lastUpdated": new Date().toJSON()
	};
	this.http.post(url, postBodyLogin, options)
			.subscribe(() =>
			{
        this.addUserDetail();
				this.navCtrl.setRoot(LoginPage);
			},
			error =>
			{
				this.handleError(error);
			});
  }



  handleError(error) {
        console.error(error);
		this.showAlert();
  }
}
