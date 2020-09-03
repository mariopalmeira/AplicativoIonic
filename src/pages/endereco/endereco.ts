import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClienteService } from '../../services/domain/cliente.service';
import { StorageService } from '../../services/storage.service';
import { EnderecoDTO } from '../../models/endereco.dto';
import { PedidoDTO } from '../../models/pedido.dto';

@IonicPage()
@Component({
  selector: 'page-endereco',
  templateUrl: 'endereco.html',
})
export class EnderecoPage {

  enderecos : EnderecoDTO[];
  pedido : PedidoDTO;

  constructor(public navCtrl: NavController, public navParams: NavParams, public clienteService : ClienteService, public storageService : StorageService) {
  }

  ionViewDidLoad() {
    let usuarioLogado = this.storageService.getUsuario();
    if(usuarioLogado && usuarioLogado.email){
      this.clienteService.findByEmail(usuarioLogado.email)
      .subscribe(
        response => {
          this.enderecos = response['endereco'], 
          this.pedido = {
            cliente: {id: response['id']},
            enderecoEntrega: null,
            pagamento: null,
            itemPedido: null
          }
        }, 
        error => {
          if(error.status == 403){
            this.navCtrl.setRoot('HomePage');
          }
        }
      );
    }
  }

  escolherPagamento(endereco : EnderecoDTO){
    this.pedido.enderecoEntrega = {id: endereco.id};
    this.navCtrl.push('PagamentoPage', {'pedido' : this.pedido});
  }

}
