import {Component} from '@angular/core';
import { NavController, NavParams, SqlStorage, Storage,  AlertController } from 'ionic-angular';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { LocationTracker } from '../../providers/location-tracker/location-tracker';
import { BioPage } from '../../pages/bio/bio';
@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  private storage: Storage;
  public base64Image: string;
  public url: string = "http://107.167.177.146/api-public110/api/publiks?filter[where][email]="+this.tracker.nik+"&access_token=" + this.tracker.token;


  constructor(private navCtrl: NavController,private http: Http, public tracker: LocationTracker, private alertController:  AlertController) {
  let headers = new Headers({ 'Content-Type': 'application/json' });
  let options = new RequestOptions({ headers: headers });
  this.http.get(this.url, options)
      .subscribe((data) =>
      {
        let items = data.json();
        console.log(items[0].email);
        if(items[0].telp==null){
          this.navCtrl.setRoot(BioPage);
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
  }
}
