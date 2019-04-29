import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { UsuarioService } from '../servicios/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  correo: string;
  clave: string;

  constructor(db: AngularFireDatabase, public servUsuario: UsuarioService) { 
    /* db.list('/usuarios', ref => ref.orderByChild('correo').equalTo('usuario1@gmail.com')).valueChanges().subscribe(
      usuarios => {
        console.log(usuarios);
        console.log(usuarios.length);
        //this.usuarios = usuarios;
      }
    ); */    
  }

  ngOnInit() {
  }

  iniciar_sesion(){
    console.log(this.correo);
    console.log(this.clave);
    this.servUsuario.iniciar_sesion(this.correo, this.clave);
  }

}
