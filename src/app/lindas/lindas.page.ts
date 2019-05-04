import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ToastController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { FirebaseApp } from 'angularfire2';
import { storage } from 'firebase';
import { isObject } from 'util';
import { stringify } from 'querystring';
import { UsuarioService } from '../servicios/usuario.service';

@Component({
  selector: 'app-lindas',
  templateUrl: './lindas.page.html',
  styleUrls: ['./lindas.page.scss'],
})
export class LindasPage implements OnInit {

  tipoPagina: string = "lindas";
  esMobile: boolean = true;
  imagen: string;
  errores;

  constructor(private camara: Camera, public toastCtrl: ToastController, device: Platform, public servUsuario: UsuarioService) {
    //this.esMobile = device.is("cordova");
  }

  ngOnInit() {
  }

  tomarFoto(){
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camara.DestinationType.DATA_URL,
      encodingType: this.camara.EncodingType.JPEG,
      mediaType: this.camara.MediaType.PICTURE
    }
    
    this.camara.getPicture(options).then(
      (imageData) => {
        this.imagen = `data:image/jpeg;base64,${imageData}`;
      }, (err) => {
        this.mostrarMensaje("Error! "+JSON.stringify(err));
      }
    );
  }
  
  subirFoto(){
    try {
      let storageRef = storage().ref();
  
      const nombreArchivo = this.servUsuario.el_usuario.correo+" "+this.ahora();
  
      const imageRef = storageRef.child(`imagenes/${nombreArchivo}.jpg`);
  
      imageRef.putString(this.imagen, storage.StringFormat.DATA_URL).then(
        (snapshot)=> {
          this.mostrarMensaje('Se subió tu foto!');
        }
        );
      } catch (error) {
        
        this.errores = error;
        
        if(isObject(error)){
          error = stringify(error);
        }
        
        this.mostrarMensaje("Error! "+error);
      }
    }
    
    ahora(){        
      var tzoffset = (new Date()).getTimezoneOffset() * 60000;
      var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 19).replace('T', ' ');
      return localISOTime;
    }

    async mostrarMensaje(text: string) {
      let toast = await this.toastCtrl.create({
      message: text,
      duration: 3500
    });
    toast.present();
  }

}
