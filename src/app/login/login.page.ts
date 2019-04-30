import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { UsuarioService } from '../servicios/usuario.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginForm: FormGroup;
  showpass: boolean = false;
  
  usuariosTest = [
    {correo: "admin@gmail.com", clave: "1111"},
    {correo: "invitado@gmail.com", clave: "2222"},
    {correo: "usuario@gmail.com", clave: "3333"},
    {correo: "anonimo@gmail.com", clave: "4444"},
    {correo: "tester@gmail.com", clave: "5555"}
  ];

  constructor(db: AngularFireDatabase, public servUsuario: UsuarioService, private formBuilder: FormBuilder, public router:Router, public actionSheetCtrl: ActionSheetController) {
    this.loginForm = this.formBuilder.group({
      correo: ['', Validators.compose([Validators.maxLength(50), Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'), Validators.required])],
      clave: ['', Validators.compose([Validators.maxLength(20), Validators.required])],
    });
    this.servUsuario.logueado.subscribe(
      valor =>{
        if (valor == true) {
          router.navigateByUrl("/");
        }
      }
    );
  }

  ngOnInit() {
  }

  iniciar_sesion(){
    //console.log(this.loginForm.value['correo']);
    //console.log(this.loginForm.value['clave']);
    this.servUsuario.iniciar_sesion(this.loginForm.value['correo'], this.loginForm.value['clave']);
  }

  elegirTest(id:number){
    this.loginForm.controls['correo'].setValue(this.usuariosTest[id].correo);
    this.loginForm.controls['clave'].setValue(this.usuariosTest[id].clave);
  }

  async presentActionSheet() {
    let controles = [];

    for (let index = 0; index < this.usuariosTest.length; index++) {
      controles.push({
        text: this.usuariosTest[index].correo,
        cssClass: 'centerActionSheet',
        handler: () => {
          this.elegirTest(index);
        }
      });
    }
    
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Usuarios de prueba',
      buttons: controles
    });
    await actionSheet.present();
  }

  registrarme(){
    this.router.navigateByUrl("/registrarse");
  }

}
