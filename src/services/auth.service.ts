import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CredenciaisDTO } from '../models/credenciais.dto';
import { API_CONFIGURACOES } from "../config/api.config";
import { StorageService } from "./storage.service";
import { UsuarioLogado } from "../models/usuario_logado";
import { JwtHelper } from "angular2-jwt";
import { Carrinho } from "../models/carrinho";

@Injectable()
export class AuthService{

    jwtHerlper : JwtHelper = new JwtHelper();
    constructor(public http:HttpClient, public storage:StorageService){}

    authenticate(credenciais : CredenciaisDTO){
        ////////////////.post(endereço, dados, como tratar a resposta(observar a resposta porque eu quero o que vem nela e que não o vem um json e não deve tentar converter para json))
        return this.http.post(`${API_CONFIGURACOES.urlBase}/login`, credenciais, {observe: 'response', responseType: 'text'})
    }

    successfulLogin(token:string){
        let tokenNovo = token.substring(7);
        let usuario : UsuarioLogado = {token : tokenNovo, email : this.jwtHerlper.decodeToken(tokenNovo).sub};
        this.storage.setUsuario(usuario);
        let carrinho : Carrinho = {items: []};
        this.storage.setCarrinho(carrinho);
    }

    logout(){
        this.storage.setUsuario(null);
        this.storage.setCarrinho(null);
    }
}