import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidoDTO } from '../../models/pedido.dto';
import { CarrinhoService } from '../../services/domain/carrinho.service';
import { PagamentoDTO } from '../../models/pagamento.dto';

@IonicPage()
@Component({
  selector: 'page-pagamento',
  templateUrl: 'pagamento.html',
})
export class PagamentoPage {

  pedido : PedidoDTO;
  totalCarrinho: number;
  parcela : {vez: number, valor: number}
  parcelamento = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public carrinhoService : CarrinhoService) {
  }

  ionViewDidLoad() {
    let parametro = this.navParams.get('pedido');
    this.pedido = parametro;
    this.totalCarrinho = this.carrinhoService.totalCarrinho();
    for(let i = 1; i <= 12; i++){
      this.parcela = {vez: i, valor: this.totalCarrinho / i};
      this.parcelamento.push(this.parcela);
    }
  }

  pagar(arrobaType : string, parcela: any){
    let vez : any;
    if(arrobaType == "pagamentoCartao"){
      vez = parcela;
    }else{
      vez = null;
    }
    let pagamento : PagamentoDTO = {
      numeroParcelas: vez,
      "@type": arrobaType
    };
    this.pedido.pagamento = pagamento;
    this.navCtrl.push('PedidoPage', {'pedido':this.pedido});
  }
}
