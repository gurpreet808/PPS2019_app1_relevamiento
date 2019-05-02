import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ToastController } from '@ionic/angular';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-lindas',
  templateUrl: './lindas.page.html',
  styleUrls: ['./lindas.page.scss'],
})
export class LindasPage implements OnInit {

  esMobile: boolean = true;
  imagen: any='';

  constructor(private camara: Camera, public toastCtrl: ToastController, device: Platform) {
    //this.esMobile = device.is("cordova");
  }

  ngOnInit() {
  }

  abrirCamara(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camara.DestinationType.FILE_URI,
      encodingType: this.camara.EncodingType.JPEG,
      mediaType: this.camara.MediaType.PICTURE
    }
    
    this.camara.getPicture(options).then(
      (imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        //alert(imageData)
        this.imagen = (<any>window).Ionic.WebView.convertFileSrc(imageData);
      }, (err) => {
        // Handle error
        this.mostrarMensaje("Error! "+JSON.stringify(err));
      }
    );

  }

  async mostrarMensaje(text: string) {
    let toast = await this.toastCtrl.create({
      message: text,
      duration: 3000
    });
    toast.present();
  }

}
