import { Component, OnInit } from '@angular/core';
import { ImagenfsService } from '../servicios/imagenfs.service';
import { UsuarioService } from '../servicios/usuario.service';
import { ImagenFS } from '../clases/imagenfs';

@Component({
  selector: 'app-mis-fotos',
  templateUrl: './mis-fotos.page.html',
  styleUrls: ['./mis-fotos.page.scss'],
})
export class MisFotosPage implements OnInit {

  esMobile: boolean = true;
  misFotos: ImagenFS[] = [];
  usuario: string;
  fotosQuery: any;

  constructor(
    //public toastCtrl: ToastController, 
    //device: Platform,
    public servUsuario: UsuarioService,
    public servImagenes: ImagenfsService) {

    //this.esMobile = device.is("cordova");
  }
  
  ngOnInit() {
    this.cargarMisFotos();

    this.servUsuario.logueado.subscribe(
      (estado) => {
        //console.log(estado);
        if (estado == false) {
          //console.log("me voy");
          this.fotosQuery.unsubscribe();
          this.misFotos = [];
        } else {
          this.cargarMisFotos();
        }
      }
    );
  }

  cargarMisFotos(){
    this.usuario = this.servUsuario.el_usuario.correo;
    this.fotosQuery = this.servImagenes.traerMisFotos(this.usuario).subscribe(
      (imagenes: ImagenFS[]) => {
        if(imagenes.length != 0){
          this.misFotos = imagenes.sort((a,b) => b.fecha_subida.localeCompare(a.fecha_subida));
          //console.log(this.misFotos);
        } else {
          console.log("Sin fotos");
          //this.misFotos = [];
        }
      }
    );
  }
  
  /* async mostrarMensaje(text: string) {
    let toast = await this.toastCtrl.create({
      message: text,
      duration: 3000
    });
    toast.present();
  } */
}