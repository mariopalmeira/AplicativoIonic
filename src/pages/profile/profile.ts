import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { ClienteService } from '../../services/domain/cliente.service';
import { ClienteDTO } from '../../models/cliente.dto';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  email : string;
  cliente : ClienteDTO;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storageService: StorageService, public clienteService: ClienteService) {
  }

  ionViewDidLoad() { 
    let usuarioLogado = this.storageService.getUsuario();
    if(usuarioLogado && usuarioLogado.email){
      this.email = usuarioLogado.email;
      this.clienteService.findByEmail(this.email)
      .subscribe(
        response => {this.cliente = response as ClienteDTO}, 
        error => {
          if(error.status == 403){
            this.navCtrl.setRoot('HomePage');
          }
        }
      );
    }
    // else{
    //   this.navCtrl.setRoot('HomePage');
    // }
  }

}
