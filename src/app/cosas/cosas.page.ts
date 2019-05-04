import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ToastController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/storage';
import { isObject } from 'util';
import { stringify } from 'querystring';
import { UsuarioService } from '../servicios/usuario.service';
import { LoadingController } from '@ionic/angular';
import { ImagenfsService } from '../servicios/imagenfs.service';
import { ImagenFS } from '../clases/imagenfs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cosas',
  templateUrl: './cosas.page.html',
  styleUrls: ['./cosas.page.scss'],
})
export class CosasPage implements OnInit {

  tipoPagina: string = "linda";
  esMobile: boolean = true;
  imagen: string;
  horaActual: string;
  ultimoID: number;
  errores;

  constructor(
    private camara: Camera, 
    public toastCtrl: ToastController, 
    device: Platform, 
    public servUsuario: UsuarioService, 
    public servImagenes: ImagenfsService, 
    public loadingController: LoadingController,
    private activatedRoute: ActivatedRoute,
    private afs: AngularFireStorage) {

    //this.esMobile = device.is("cordova");
    this.servImagenes.traer_ultimo_ID().subscribe(
      (datos: ImagenFS[]) =>{
        if(datos[0] != null){
          this.ultimoID = datos[0].id;
          //console.log(this.ultimoID);
        }
      }
    );
  }
  
  ngOnInit() {
    this.tipoPagina = this.activatedRoute.snapshot.paramMap.get('tipo');
    if(this.tipoPagina == "linda"){
      this.servImagenes.traerLindas();
    } else {
      this.servImagenes.traerFeas();
    }
  }

  tomarFoto(){
    const options: CameraOptions = {
      quality: 50,
      targetHeight: 600,
      targetWidth: 600,
      destinationType: this.camara.DestinationType.DATA_URL,
      encodingType: this.camara.EncodingType.JPEG,
      mediaType: this.camara.MediaType.PICTURE
    }
    
    this.camara.getPicture(options).then(
      (imageData) => {
        this.imagen = `data:image/jpeg;base64,${imageData}`;
        this.subirFoto();
      }, (err) => {
        if(err != "No Image Selected"){
          this.mostrarMensaje("Error! "+JSON.stringify(err));
        }
      }
    );
  }
  
  subirFoto(){
    this.presentLoading();

    try {
      let storageRef = this.afs.storage.ref();
      this.ahora();
  
      const nombreArchivo = this.servUsuario.el_usuario.correo+" "+this.horaActual;
  
      const imageRef = storageRef.child(`imagenes/${nombreArchivo}.jpg`);
  
      imageRef.putString(this.imagen, 'data_url').then(
        (snapshot)=> {
          imageRef.getDownloadURL().then(
            (datos) => {
              let imagen = {
                id: this.ultimoID+1,
                usuario: this.servUsuario.el_usuario.correo,
                tipo: this.tipoPagina,
                url: datos,
                votos: 0,
                fecha_subida: this.horaActual,
              };

              this.servImagenes.registrar_imagen(imagen);
            }
          )
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
    this.horaActual = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 19).replace('T', ' ');
  }
  
  async mostrarMensaje(text: string) {
    let toast = await this.toastCtrl.create({
      message: text,
      duration: 3000
    });
    toast.present();
  }

  votar(id: number, votos: number){
    votos++;
    this.servImagenes.sumarVoto(id, votos);
  }

  tipoArray(){
    if (this.tipoPagina == "linda") {
      return this.servImagenes.imagenesLindas;
    } else {
      return this.servImagenes.imagenesFeas; 
    }
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Subiendo foto',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }
}
