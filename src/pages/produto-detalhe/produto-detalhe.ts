import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoService } from '../../services/domain/produto.service';
import { ProdutoDTO } from '../../models/produto.dto';
import { CarrinhoService } from '../../services/domain/carrinho.service';

@IonicPage()
@Component({
  selector: 'page-produto-detalhe',
  templateUrl: 'produto-detalhe.html',
})
export class ProdutoDetalhePage {

  produto : ProdutoDTO;
  constructor(public navCtrl: NavController, public navParams: NavParams, public produtoService : ProdutoService, public carrinhoService : CarrinhoService) {
  }

  ionViewDidLoad() {
    let id = this.navParams.get('id_produto');
    this.produtoService.buscaProduto(id)
    .subscribe(response=>{this.produto = response}, error=>{console.log('error')});
  }

  adicionarAoCarrinho(produto : ProdutoDTO){
    this.carrinhoService.adicionaProdutoCarrinho(produto);
    this.navCtrl.setRoot('CarrinhoPage');
  }
}
