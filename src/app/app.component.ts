import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
//import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public splash = true;

  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    }
  ];

  constructor(
    private platform: Platform,
    //private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
    setTimeout(() => this.splash = false, 5000);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
    });
  }

  estilo_app(): object{
    if(this.splash){
      let estilo_splash = {
        "background-color": "#85e7ff"
      };

      return estilo_splash;
    }
    return {};
  }
}
