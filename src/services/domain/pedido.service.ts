import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { PedidoDTO } from "../../models/pedido.dto";
import { API_CONFIGURACOES } from "../../config/api.config";
import { HeaderCreator } from "../header-creator.service";

@Injectable()
export class PedidoService{

    constructor(public httpClient : HttpClient, public headerCreator : HeaderCreator){}

    inserirPedido(pedido : PedidoDTO) {
        let headers = this.headerCreator.montaHeader();
        return this.httpClient.post(`${API_CONFIGURACOES.urlBase}/pedidos`, pedido, {'headers': headers, observe: 'response',  responseType: 'text'});
    }
}