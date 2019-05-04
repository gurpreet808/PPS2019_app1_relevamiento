import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { UsuarioService } from '../servicios/usuario.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../clases/usuario';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.page.html',
  styleUrls: ['./registrarse.page.scss'],
})
export class RegistrarsePage implements OnInit {

  public registerForm: FormGroup;
  public un_usuario: Usuario;
  showpass: boolean = false;
  //showpass2: boolean = false;
  ultimoID: number = 0;
  subscripcion;
  
  constructor(db: AngularFireDatabase, public servUsuario: UsuarioService, private formBuilder: FormBuilder, public router:Router) { 
    this.registerForm = this.formBuilder.group({
      correo: ['', Validators.compose([Validators.maxLength(50), Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'), Validators.required])],
      clave: ['', Validators.compose([Validators.maxLength(20), Validators.required])],
      //clave2: ['', Validators.compose([Validators.maxLength(20), Validators.required])],
      sexo: ['', Validators.compose([Validators.required])],
      perfil: ['', Validators.compose([Validators.required])],
    });
    this.servUsuario.traer_ultimo_ID().subscribe(
      (datos: Usuario[]) =>{
        if(datos[0] != null){
          this.ultimoID = datos[0].id;
          //console.log(this.ultimoID);
        }
      }
    );
  }
  
  ngOnInit() {
    this.registerForm.reset();
  }
  
  ngOnDestroy() {
    this.registerForm.reset();
 }

  registrarme(){
    let comprobarQuery = this.servUsuario.comprobar_correo(this.registerForm.value.correo).subscribe(
      (usuario: Usuario[]) => {
        //console.log(usuario.length);
        if(usuario.length == 0){
          //OK, no esta ese mail
          
          //delete this.registerForm.value.clave2;
          this.un_usuario = this.registerForm.value;
          this.un_usuario.id = this.ultimoID+1;
          //console.log(this.ultimoID);
          //console.log(this.un_usuario);
          this.servUsuario.traer_ultimo_ID();
          this.servUsuario.registrar_usuario(this.un_usuario);
        } else {
          //Error! ese mail ya está
          this.servUsuario.mostrarMensaje("Ups! Ese mail ya está registrado.");
        }
        comprobarQuery.unsubscribe();
      }
    );
  }

  iniciar_sesion(){
    this.router.navigateByUrl("/login");
  }

}
