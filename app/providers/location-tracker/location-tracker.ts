import { Injectable } from '@angular/core';
import { Geolocation } from 'ionic-native';
import {Network} from 'ionic-native';
import { Observable } from 'rxjs/Observable';
import { BackgroundGeolocation } from 'ionic-native';
import {Platform} from 'ionic-angular';
import {Storage, SqlStorage} from 'ionic-angular';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

export class DataLogin {
	nik: string;
	password: string;
}

declare var Connection;

@Injectable()
export class LocationTracker {
  public url: string = "http://107.167.177.146/api-public110/api/";
  positionObserver: any;
  position: any;
  watch: any;
  subscription : any;
  onDevice: boolean;
  storage : any;
  public nik: string = '';
  conf: any;
  public token: string = '';

  public isRegistered() {
		if (this.nik == undefined) {return false};
			return true;
  }

	public logOut(){
	this.storage.query("DROP TABLE IF EXISTS conf");
	/*this.getConfig("nik").then((data) => {
		let res = data.res;
		if (res.rows.length>0) {
		  	for (let i = 0; i<res.rows.length; i++)
					this.nik = res.rows.item(i).value;
 		  	console.log("nik : " + this.nik );
				this.storage.query("DROP TABLE IF EXISTS conf");
				let sql = 'DELETE FROM conf WHERE email = (?)';
				this.storage.query(sql, [this.nik]);
			}
		}, (error) => {
						console.log("ERROR: " + JSON.stringify(error));
		});*/


	}

  public logedin(nik: string, data) {
    this.nik = nik;
	this.token = data.id;
	console.log("save token");
	console.log(nik);
	console.log(data.id);
	this.storage.query("INSERT OR REPLACE INTO conf (email, value) values (?,?)",
	["token", this.token]).then((data) => {
		console.log("save token");
	}, (error) => {
            console.log(error.err);
    });
	this.storage.query("INSERT OR REPLACE INTO conf (email, value) values (?,?)",
	["nik", this.nik]).then((data) => {
		console.log("save nik");
	}, (error) => {
            console.log(error.err);
    });
  }

  constructor(private http: Http, private platform: Platform) {
   	this.storage = new Storage(SqlStorage);
    this.storage.query("CREATE TABLE IF NOT EXISTS conf (email TEXT PRIMARY KEY, value TEXT) ");
		console.log("Hii");
    this.onDevice = this.platform.is('cordova');
  	this.positionObserver = null;

    this.position = Observable.create(observer => {
      this.positionObserver = observer;
    });
	this.getConfig("token").then((data) => {
		let res = data.res;
		if (res.rows.length>0) {
		  for (let i = 0; i<res.rows.length; i++)
			this.token = res.rows.item(i).value;
 		  console.log("Token : " + this.token );
		}
	}, (error) => {
            console.log("ERROR: " + JSON.stringify(error));
    });
	this.getConfig("nik").then((data) => {
		let res = data.res;
		if (res.rows.length>0) {
		  for (let i = 0; i<res.rows.length; i++)
			this.nik = res.rows.item(i).value;
 		  console.log("nik : " + this.nik );
		}
	}, (error) => {
            console.log("ERROR: " + JSON.stringify(error));
    });

  }
  isOnline(): boolean {
    if(this.onDevice && Network.connection){
      return Network.connection !== Connection.NONE;
    } else {
      return navigator.onLine;
    }
  }

  isOffline(): boolean {
    if(this.onDevice && Network.connection){
      return Network.connection === Connection.NONE;
    } else {
      return !navigator.onLine;
    }
  }

  public updateConfig(email: string, value: string)
  {
	this.storage.query("DELETE FROM conf where email = ?",
	[email]).then((data) => {
		console.log("delete conf");
		this.storage.query("INSERT OR REPLACE INTO conf (email, value) values (?,?)",
		[email, value]).then((data) => {
			console.log("insert conf");
		}, (error) => {
				console.log(error);
		});
	}, (error) => {
            console.log(error);
    });
  }

  public getConfig(email: string)
  {
	    return this.storage.query("SELECT value from conf where email = ?",[email]);
  }




  handleError(error) {
        console.error(error);
		return Observable.throw(error.json().error || 'Server error');
  }


}
