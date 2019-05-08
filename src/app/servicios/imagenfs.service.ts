import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ToastController } from '@ionic/angular';
import { ImagenFS } from '../clases/imagenfs';

@Injectable({
  providedIn: 'root'
})
export class ImagenfsService {

  public imagenesLindas: ImagenFS[];
  public imagenesFeas: ImagenFS[];
  public

  constructor(public db: AngularFireDatabase, public toastCtrl: ToastController) {
    
  }

  traerLindas(){
    let lindasQuery = this.db.list('/imagenes', ref => ref.orderByChild("tipo").equalTo("linda")).valueChanges().subscribe(
      (imagenes: ImagenFS[]) => {
        this.imagenesLindas = imagenes.sort((a,b) => b.fecha_subida.localeCompare(a.fecha_subida));
        console.log(this.imagenesLindas);
        //lindasQuery.unsubscribe();
      }
    );
  }

  traerFeas(){
    let feasQuery = this.db.list('/imagenes', ref => ref.orderByChild("tipo").equalTo("fea")).valueChanges().subscribe(
      (imagenes: ImagenFS[]) => {
        this.imagenesFeas = imagenes.sort((a,b) => b.fecha_subida.localeCompare(a.fecha_subida));
        console.log(this.imagenesFeas);
        //lindasQuery.unsubscribe();
      }
    );
  }

  traerTodas(){
    return this.db.list('/imagenes', ref => ref.orderByChild("tipo").equalTo("fea")).valueChanges();
  }

  registrar_imagen(imagen: ImagenFS){
    let itemsRef = this.db.list('imagenes');
    itemsRef.push(imagen)
    .then( 
      datos => {
        //console.log(datos);
        this.mostrarMensaje("Bien! Se registró tu foto.");
      }
    )
    .catch(
      err => {
        this.mostrarMensaje("Hubo un error inténtalo de nuevo...");
      }
    );
  }

  traer_ultimo_ID(){
    return this.db.list('/imagenes', ref => ref.orderByChild("id").limitToLast(1)).valueChanges();
  }

  sumarVoto(id_foto: number, id_usuario: number, cantVotos: number){
    let id_voto = id_foto+"@"+id_usuario;

    let votosQuery = this.db.list('/votos', ref => ref.orderByChild("id").equalTo(id_voto)).valueChanges().subscribe(
      (votos) => {
        //console.log(votos);
        if (votos.length == 0) {
          let imagenesRef = this.db.database.ref().child("imagenes");
          let imagenQuery = imagenesRef.orderByChild('id').equalTo(id_foto);
          imagenQuery.on("child_added", function (snapshot) {
            snapshot.ref.update({ votos: cantVotos })
          });

          let itemsRef = this.db.list('votos');
          itemsRef.push({id:id_voto})
          .then( 
            datos => {
              //console.log(datos);
              this.mostrarMensaje("Gracias! Se registró tu voto");
            }
          )
          .catch(
            err => {
              this.mostrarMensaje("Hubo un error inténtalo de nuevo...");
            }
          );
        } else {
          this.mostrarMensaje("Ya hs votado esta foto...");
        }
        votosQuery.unsubscribe();
      }
    );

  }

  revisarVoto(id_foto: number){
  }

  async mostrarMensaje(text: string) {
    let toast = await this.toastCtrl.create({
      message: text,
      duration: 3000
    });
    toast.present();
  }
}
