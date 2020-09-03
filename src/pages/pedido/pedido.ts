import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { PedidoDTO } from '../../models/pedido.dto';
import { ItemCarrinho } from '../../models/item-carrinho';
import { CarrinhoService } from '../../services/domain/carrinho.service';
import { StorageService } from '../../services/storage.service';
import { ClienteService } from '../../services/domain/cliente.service';
import { EnderecoDTO } from '../../models/endereco.dto';
import { ClienteDTO } from '../../models/cliente.dto';
import { PagamentoDTO } from '../../models/pagamento.dto';
import { b } from '@angular/core/src/render3';
import { PedidoService } from '../../services/domain/pedido.service';

@IonicPage()
@Component({
  selector: 'page-pedido',
  templateUrl: 'pedido.html',
})
export class PedidoPage {

  pedido : PedidoDTO;
  carrinho : ItemCarrinho[];
  endereco : EnderecoDTO;
  cliente : ClienteDTO;
  pagamento : PagamentoDTO;
  totalCarrinho : number;
  textoTipoPagamento : string;
  textoPagamento : string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public carrinhoService: CarrinhoService, public storageService : StorageService, public clienteService : ClienteService, public pedidoService : PedidoService, public alertController : AlertController) {
  }

  ionViewDidLoad() {
    this.pedido = this.navParams.get('pedido');
    this.carrinho = this.carrinhoService.buscaCarrinho().items;
    let usuarioLogado = this.storageService.getUsuario();
    if(usuarioLogado && usuarioLogado.email){
      this.clienteService.findByEmail(usuarioLogado.email)
      .subscribe(
        response => {
          this.cliente = response as ClienteDTO
          this.endereco = this.enderecoPorId(this.pedido.enderecoEntrega.id, response['endereco']), 
          this.pagamento = this.pedido.pagamento
          this.totalCarrinho = this.carrinhoService.totalCarrinho()
          if(this.pagamento["@type"] == 'pagamentoCartao'){
            this.textoTipoPagamento = "Cartão: "
            let parcelamento = (this.totalCarrinho / this.pagamento.numeroParcelas).toFixed(2);
            this.textoPagamento = " em "+this.pagamento.numeroParcelas+"x"+" de "+"R$"+parcelamento;
          }else{
            this.textoTipoPagamento = "Boleto: "
            this.textoPagamento = " à vista";
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

  enderecoPorId(id : string, enderecos : EnderecoDTO[]) : EnderecoDTO{
    let enderecoEntrega : EnderecoDTO;
    for(let i = 0; i < enderecos.length; i++){
      if(id == enderecos[i].id){
        enderecoEntrega = enderecos[i];
      }
    }
    return enderecoEntrega;
  }

  confirmarPedido(){
    this.pedido.itemPedido = this.carrinho;
    this.pedidoService.inserirPedido(this.pedido)
    .subscribe(response => {this.pedidoInserido()}, error => {this.pedidoNaoInserido()});
  }

  conferirPedido(){
    this.navCtrl.setRoot('CarrinhoPage');
  }

  pedidoInserido(){
    let alert = this.alertController.create({
      title: "Pedido recebido! Obrigado por comprar com a NASA!",
      subTitle: "Pronto! Agora é só acompanhar o status da sua compra pelos nossos emails.",
      enableBackdropDismiss: false,
      buttons:[{text: 'OK', handler:() => {this.navCtrl.setRoot('CategoriasPage');}}]
    });
    alert.present();
  }

  pedidoNaoInserido(){
    let alert = this.alertController.create({
      title: "Oops!",
      subTitle: "Parece que algo deu errado. Tente novamente.",
      enableBackdropDismiss: false,
      buttons:[{text: 'OK', handler:() => {this.navCtrl.setRoot('CarrinhoPage');}}]
    });
    alert.present();
  }
}
