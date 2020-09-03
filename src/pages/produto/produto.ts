import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoService } from '../../services/domain/produto.service';
import { ProdutoDTO } from '../../models/produto.dto';

@IonicPage()
@Component({
  selector: 'page-produto',
  templateUrl: 'produto.html',
})
export class ProdutoPage {

  produtos : ProdutoDTO[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public produtoService : ProdutoService) {
  }

  ionViewDidLoad() {
    //Pegar o parâmetro que veio do categoriapage
    let id = this.navParams.get('id_categoria');
    this.produtoService.listaProdutosPorCategoria(id)
    .subscribe(response =>{this.produtos = response['content']}, error=>{console.log('error')});
  }

  produtoDetalhe(id : string){
    this.navCtrl.push('ProdutoDetalhePage',{'id_produto':id});
  }

}
