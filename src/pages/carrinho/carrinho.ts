import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Item } from 'ionic-angular';
import { Carrinho } from '../../models/carrinho';
import { CarrinhoService } from '../../services/domain/carrinho.service';
import { ItemCarrinho } from '../../models/item-carrinho';
import { ProdutoDTO } from '../../models/produto.dto';

@IonicPage()
@Component({
  selector: 'page-carrinho',
  templateUrl: 'carrinho.html',
})
export class CarrinhoPage {

  carrinho : ItemCarrinho[];
  totalCarrinho : number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public carrinhoService : CarrinhoService) {
  }

  ionViewDidLoad() {
    this.carrinho = this.carrinhoService.buscaCarrinho().items;
    this.totalCarrinho = this.carrinhoService.totalCarrinho();
  }

  incrementaProdutoCarrinho(produto : ProdutoDTO){
    this.carrinhoService.adicionaProdutoCarrinho(produto);
    this.navCtrl.setRoot('CarrinhoPage');
  }

  decrementaProdutoCarrinho(produto : ProdutoDTO){
    this.carrinhoService.decrementaProdutoCarrinho(produto);
    this.navCtrl.setRoot('CarrinhoPage');
  }

  removeProdutoCarrinho(produto : ProdutoDTO){
    this.carrinhoService.removeProdutoCarrinho(produto);
    this.navCtrl.setRoot('CarrinhoPage');
  }

  continuarComprando(){
    this.navCtrl.setRoot('CategoriasPage');
  }

  confirmarEndereco(){
    this.navCtrl.push('EnderecoPage');
  }
}
