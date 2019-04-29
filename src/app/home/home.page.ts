import { Component } from '@angular/core';
import { UsuarioService } from '../servicios/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(servUsuario: UsuarioService, router: Router){
    if (servUsuario.logueado.value == false) {
      router.navigateByUrl('/login');
    }
  }

}
