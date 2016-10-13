import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';

declare var google;

/*
  Generated class for the PolisiterdekatPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/polisiterdekat/polisiterdekat.html',
})
export class PolisiterdekatPage {
@ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(private navCtrl: NavController) {

  }
ionViewLoaded(){
    this.loadMap();
  }

  loadMap(){

    /*let latLng = new google.maps.LatLng(-34.9290, 138.6010);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);*/

    let locationOptions = {timeout: 10000, enableHighAccuracy: true};

        navigator.geolocation.getCurrentPosition(

            (position) => {

                let options = {
                  center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                  zoom: 16,
                  mapTypeId: google.maps.MapTypeId.ROADMAP
                }

                this.map = new google.maps.Map(this.mapElement.nativeElement, options);
            },

            (error) => {
                console.log(error);
            }, locationOptions

        );


  }
}
