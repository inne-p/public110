import { Component, ViewChild } from '@angular/core';
import { ionicBootstrap, Platform, Nav } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import {TabsPage} from './pages/tabs/tabs';
import {LoginPage} from './pages/login/login';
import {SignupPage} from './pages/signup/signup';
import {HomePage} from './pages/home/home';
import {AboutPage} from './pages/about/about';
import {ContactPage} from './pages/contact/contact';

import {PolisiterdekatPage} from './pages/polisiterdekat/polisiterdekat';
import {LaporPage} from './pages/lapor/lapor';
import {InfodpoPage} from './pages/infodpo/infodpo';
import {OranghilangPage} from './pages/oranghilang/oranghilang';
import {LalulintasPage} from './pages/lalulintas/lalulintas';
import {ProsedurPage} from './pages/prosedur/prosedur';
import {SettingsPage} from './pages/settings/settings';
import { LocationTracker } from './providers/location-tracker/location-tracker';

@Component({
  templateUrl: 'build/app.html'
})
export class MyApp {

  private rootPage: any;
  @ViewChild(Nav) nav: Nav;
  pages: Array<{title: string, component: any}>;

  constructor(private platform: Platform, public tracker: LocationTracker) {
    this.initializeApp(tracker);
    this.rootPage = LoginPage;
    this.pages = [
      { title: 'Beranda', component: HomePage },
      { title: 'Polisi Terdekat', component: PolisiterdekatPage },
      { title: 'Lapor (Emergency Button)', component: LaporPage },
      { title: 'Info DPO', component: InfodpoPage },
      { title: 'Info Orang Hilang', component: OranghilangPage },
      { title: 'Info Lalu Lintas', component: LalulintasPage },
      { title: 'Prosedur Kepolisian', component: ProsedurPage },
      { title: 'Settings', component: SignupPage },
      { title: 'Logout', component: SignupPage }
    ];

  }

  initializeApp(tracker: LocationTracker) {
    this.platform.ready().then(() => {
		tracker.getConfig("nik").then((data) => {
			let res = data.res;
			if (res.rows.length>0) {
				tracker.getConfig("token").then((data) => {
					this.nav.setRoot(HomePage);
				},
				(error)=> {
					this.nav.setRoot(LoginPage);
				});
			}
			else{
				this.nav.setRoot(LoginPage);
			}
		}, (error) => {
				console.log("ERROR: " + JSON.stringify(error));
				this.nav.setRoot(LoginPage);
		});
		StatusBar.styleDefault();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}

ionicBootstrap(MyApp, [LocationTracker]);
