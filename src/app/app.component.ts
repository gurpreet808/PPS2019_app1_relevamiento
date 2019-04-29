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

  public appPages = [];

  constructor(
    private platform: Platform,
    //private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
    setTimeout(() => this.splash = false, 5000);
    this.appPages = [
      {
        title: 'Iniciar sesión',
        url: '/login',
        icon: 'log-in'
      },
      {
        title: 'Registrarse',
        url: '/registrarse',
        icon: 'list'
      }
    ];
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
