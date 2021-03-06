import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public menu: MenuController) {
  }

  //Pertence ao ciclo de vida dos eventos do ionic
  ionViewWillEnter(){
    this.menu.swipeEnable(false);  
  }

  //Pertence ao ciclo de vida dos eventos do ionic
  ionViewDidLeave(){
    this.menu.swipeEnable(true);
  }

  login(){
    this.navCtrl.setRoot('CategoriasPage');
  }
}
