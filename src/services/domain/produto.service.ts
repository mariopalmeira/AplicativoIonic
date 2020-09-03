import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { API_CONFIGURACOES } from "../../config/api.config";
import { ProdutoDTO } from "../../models/produto.dto";
import { HeaderCreator } from "../header-creator.service";

@Injectable()
export class ProdutoService {
    headers : any = this.headerCreatror.montaHeader();
    constructor(public httpClient : HttpClient, public headerCreatror : HeaderCreator){}

    listaProdutosPorCategoria(id : string) : Observable<ProdutoDTO[]>{
        return this.httpClient.get<ProdutoDTO[]>(`${API_CONFIGURACOES.urlBase}/produtos/?categorias=${id}`, {'headers': this.headers});
    }

    buscaProduto(id : string) : Observable<ProdutoDTO>{
        return this.httpClient.get<ProdutoDTO>(`${API_CONFIGURACOES.urlBase}/produtos/${id}`, {'headers':this.headers});
    }
}