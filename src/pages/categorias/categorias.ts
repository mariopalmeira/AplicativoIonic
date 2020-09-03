import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaService } from '../../services/domain/categoria.service';
import { CategoriaDTO } from '../../models/categoria.dto';

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  //Variável coleção CategoriaDTO
  items : CategoriaDTO[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public categoriaService:CategoriaService) {
  }

  ionViewDidLoad() {
    //subscribe porque é necessário se inscrever para receber a resposta que está vindo
    //response => console.log(response) é o callback por causa do ajax
    this.categoriaService.findAll()
    .subscribe(
      response => {this.items = response}, 
      error => {console.log(error)}
    );
  }

  listaProdutosPorCategoria(id : string){
    //Navegar entre páginas e passar parâmetros
    this.navCtrl.push('ProdutoPage', {id_categoria: id});
  }

}
