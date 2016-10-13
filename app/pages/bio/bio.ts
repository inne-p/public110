import { Component } from '@angular/core';
import { NavController, NavParams, SqlStorage, Storage,  AlertController } from 'ionic-angular';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { LocationTracker } from '../../providers/location-tracker/location-tracker';
import { HomePage } from '../../pages/home/home';
/*
  Generated class for the BioPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/bio/bio.html',
})
export class BioPage {
  bio: any = {};
  nik : string='';
  token : string='';
  submitted = false;
  //public url: string = "http://107.167.177.146/api-public110/api/publiks?filter[where][email]="+this.tracker.nik+"&access_token=" + this.tracker.token;

  constructor(private navCtrl: NavController,  public tracker: LocationTracker, private http: Http, private alertController:  AlertController) {
  this.tracker.getConfig("nik").then((data) => {
		let res = data.res;
		if (res.rows.length>0) {
		  for (let i = 0; i<res.rows.length; i++)
			this.nik = res.rows.item(i).value;
 		  console.log("nik : " + this.nik );
		}
	}, (error) => {
            console.log("ERROR: " + JSON.stringify(error));
    });

    this.tracker.getConfig("token").then((data) => {
      let res = data.res;
      if (res.rows.length>0) {
        for (let i = 0; i<res.rows.length; i++)
        this.token = res.rows.item(i).value;
        console.log("Token : " + this.token );
        console.log("http://107.167.177.146/api-public110/api/publiks?filter[where][email]="+this.nik+"&access_token=" + this.token);

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        this.http.get("http://107.167.177.146/api-public110/api/publiks?filter[where][email]="+this.nik+"&access_token=" + this.token, options)
            .subscribe((data) =>
            {
              let items = data.json();
              console.log(items[0].email);
              this.bio.email=items[0].email;
              this.bio.addr=items[0].alamat;
              this.bio.nama=items[0].nama;
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
      }
    }, (error) => {
              console.log("ERROR: " + JSON.stringify(error));
      });


  }

  getBio(){
  let url= this.tracker.url + "publiks/"+ this.tracker.nik;
  let headers = new Headers({ 'Content-Type': 'application/json' });
  let options = new RequestOptions({ headers: headers });

  let postBodyLogin: any = {
    "nik" : this.bio.nik,
	  "nama": this.bio.nama,
    "telp": this.bio.telp,
	  "alamat": this.bio.addr,
	  "realm": "public110",
    "username": this.bio.email,
	  "email": this.bio.email,
    "credentials": {},
    "challenges": {},
	  "emailVerified": true,
	  "status": "active",
	  "created": new Date().toJSON(),
	  "lastUpdated": new Date().toJSON()
	};

  this.http.put(url, postBodyLogin, options)
      .subscribe(data =>
      {
        let body = data.json();
        console.log(body);
        //this.tracker.logedin(this.login.nrp, body);
        this.navCtrl.setRoot(HomePage);
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
      subTitle: 'Submit data gagal silahkan cek kembali koneksi internet Anda',
      buttons: ['OK']
    });
    alert.present();
  }

  handleError(error) {
        console.error(error);
		this.showAlert();
  }

}
