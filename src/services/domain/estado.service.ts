import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { EstadoDTO } from "../../models/estado.dto";
import { Observable } from "rxjs/Rx";
import { API_CONFIGURACOES } from "../../config/api.config";

@Injectable()
export class EstadoService{
    
    constructor(public httpClient : HttpClient){}

    listaEstados() : Observable<EstadoDTO[]>{
        return this.httpClient.get<EstadoDTO[]>(`${API_CONFIGURACOES.urlBase}/estados`);
    }
}