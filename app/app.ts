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

@Component({
  templateUrl: 'build/app.html'
})
export class MyApp {

  private rootPage: any;
  @ViewChild(Nav) nav: Nav;
  pages: Array<{title: string, component: any}>;

  constructor(private platform: Platform) {
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
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}

ionicBootstrap(MyApp);
