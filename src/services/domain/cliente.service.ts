import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ClienteDTO } from "../../models/cliente.dto";
//import { Observable } from "rxjs/Rx";
import { API_CONFIGURACOES } from "../../config/api.config";
import { StorageService } from "../storage.service";
import { HeaderCreator } from "../header-creator.service";

@Injectable()
export class ClienteService{

    constructor(public httpCliente: HttpClient, public storageService: StorageService, public headerCreator : HeaderCreator){}

    // findByEmail(email: string) : Observable<ClienteDTO>{
    //     let headers = this.headerCreator.montaHeader();
    //     return this.httpCliente.get<ClienteDTO>(`${API_CONFIGURACOES.urlBase}/clientes/email?email=${email}`, {'headers': headers});
    //     //return this.httpCliente.get<ClienteDTO>(`${API_CONFIGURACOES.urlBase}/clientes/email?email=${email}`);
    // }

    findByEmail(email: string){
        let headers = this.headerCreator.montaHeader();
        return this.httpCliente.get(`${API_CONFIGURACOES.urlBase}/clientes/email?email=${email}`, {'headers': headers});
        //return this.httpCliente.get<ClienteDTO>(`${API_CONFIGURACOES.urlBase}/clientes/email?email=${email}`);
    }

    insereCliente(cliente : ClienteDTO){
        return this.httpCliente.post(`${API_CONFIGURACOES.urlBase}/clientes`, cliente, {observe:'response', responseType:'text'});
    }
}