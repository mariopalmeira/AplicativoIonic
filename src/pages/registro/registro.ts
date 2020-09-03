import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EstadoService } from '../../services/domain/estado.service';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeDTO } from '../../models/cidade.dto';
import { CidadeService } from '../../services/domain/cidade.service';
import { ClienteService } from '../../services/domain/cliente.service';

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

  formGroup : FormGroup;
  estados : EstadoDTO[];
  cidades : CidadeDTO[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder : FormBuilder, public estadoService: EstadoService, public cidadeService : CidadeService, public clienteService : ClienteService, public alertController : AlertController) {
    
    this.formGroup = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      email: ['',[Validators.required, Validators.email]],
      tipo: ['',[Validators.required]],
      cpfOuCnpj: ['',[Validators.required]],
      senha: ['',[Validators.required]],
      logradouro: ['',[Validators.required]],
      numero: ['',[Validators.required]],
      complemento: [''],
      bairro: ['',[Validators.required]],
      cep: ['',[Validators.required]],
      telefoneUm: ['',[Validators.required]],
      telefoneDois: [''],
      telefoneTres: [''],
      estadoId: [null,[Validators.required]],
      cidadeId: [null,[Validators.required]],
    });
  }

  ionViewDidLoad(){
    this.estadoService.listaEstados()
    .subscribe(response => {
      this.estados = response
      this.formGroup.controls.estadoId.setValue(this.estados[0].id)
      this.carregaCidades()
    },
    error => {
      this.estados = null,
      console.log('ERRO Estado!')});
  }

  carregaCidades(){
    this.cidadeService.listaCidadesPorEstado(this.formGroup.value.estadoId)
      .subscribe(response => {
        this.cidades = response
      },
      error => {
        this.cidades = null,
        console.log('ERRO Cidade!')
      });
  }

  registrarCliente(){
    this.clienteService.insereCliente(this.formGroup.value)
    .subscribe(response=>{this.clienteInserido()},error=>{})
  }

  clienteInserido(){
    let alert = this.alertController.create({
      title:'Criação de novo usuário',
      subTitle: 'Usuário criado com sucesso!',
      enableBackdropDismiss: false,
      buttons:[{text: 'OK', handler:() => {this.navCtrl.pop();}}]
    });
    alert.present();
  }
}
