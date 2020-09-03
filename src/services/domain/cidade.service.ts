import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { CidadeDTO } from "../../models/cidade.dto";
import { API_CONFIGURACOES } from "../../config/api.config";

@Injectable()
export class CidadeService {

    constructor(public httpClient : HttpClient){}

    listaCidadesPorEstado(estadoId : string) : Observable<CidadeDTO[]>{
        return this.httpClient.get<CidadeDTO[]>(`${API_CONFIGURACOES.urlBase}/estados/cidades/${estadoId}`);
    }
}