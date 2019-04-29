import { Injectable } from '@angular/core';
import { Usuario } from '../clases/usuario';
import { AngularFireDatabase } from 'angularfire2/database';
import { ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public logueado = new BehaviorSubject(false);
  el_usuario: Usuario;

  constructor(public db: AngularFireDatabase, public toastCtrl: ToastController) {

  }

  iniciar_sesion(correo: string, clave: string){
    let logueoQuery = this.db.list('/usuarios', ref => ref.orderByChild("correo").equalTo(correo)).valueChanges().subscribe(
      (usuario: Usuario[]) => {
        console.log(usuario.length);
        if(usuario.length == 0){
          this.mostrarMensaje("ERROR! No se encuentra ese mail");
          this.logueado.next(false);
        } else {
          if (usuario[0].clave == clave) {
            this.mostrarMensaje("Bien! te logueaste!");
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

  async mostrarMensaje(text: string) {
    let toast = await this.toastCtrl.create({
      message: text,
      duration: 3000
    });
    toast.present();
  }
}
