import { Injectable } from '@angular/core';
import { Usuario } from '../clases/usuario';
import { AngularFireDatabase } from 'angularfire2/database';
import { ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public logueado = new BehaviorSubject(false);
  el_usuario: Usuario;

  constructor(public db: AngularFireDatabase, public toastCtrl: ToastController, public router:Router) {

  }

  iniciar_sesion(correo: string, clave: string){
    let logueoQuery = this.db.list('/usuarios', ref => ref.orderByChild("correo").equalTo(correo)).valueChanges().subscribe(
      (usuario: Usuario[]) => {
        //console.log(usuario.length);
        if(usuario.length == 0){
          this.mostrarMensaje("ERROR! No se encuentra ese mail");
          this.logueado.next(false);
        } else {
          if (usuario[0].clave == clave) {
            this.mostrarMensaje("Bien! Te logueaste!");
            this.el_usuario = usuario[0];
            this.logueado.next(true);
          } else {
            this.mostrarMensaje("ERROR! Correo y clave inválidos");
            this.logueado.next(false);
          }
        }
        logueoQuery.unsubscribe();
      }
    );
  }

  cerrar_sesion(){
    this.logueado.next(false);
  }

  registrar_usuario(un_usuario: Usuario){
    let itemsRef = this.db.list('usuarios');
    itemsRef.push(un_usuario)
    .then( 
      datos => {
        //console.log(datos);
        this.mostrarMensaje("Bien! Te registraste! Ahora podés iniciar sesión");
        this.router.navigateByUrl("/login");
      }
    )
    .catch(
      err => {
        this.mostrarMensaje("Hubo un error inténtalo de nuevo...");
      }
    );
  }

  traer_ultimo_ID(){
    return this.db.list('/usuarios', ref => ref.orderByChild("id").limitToLast(1)).valueChanges();
  }

  comprobar_correo(correo: string){
    return this.db.list('/usuarios', ref => ref.orderByChild("correo").equalTo(correo)).valueChanges();
  }

  async mostrarMensaje(text: string) {
    let toast = await this.toastCtrl.create({
      message: text,
      duration: 3000
    });
    toast.present();
  }
}
