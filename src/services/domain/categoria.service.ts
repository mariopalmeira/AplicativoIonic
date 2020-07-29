import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIGURACOES } from "../../config/api.config";
import { CategoriaDTO } from "../../models/categoria.dto";
import { Observable } from "rxjs/Rx";


@Injectable()
export class CategoriaService{

    constructor(public http:HttpClient){}

    //O retorno da APi é categoriaDTO, mas como angular encapsula a requisição observando o retorno
    //então o retorno do método tem que ser observable<CategoriaDTO>
    findAll() : Observable<CategoriaDTO[]>{
        //get tipado de categoriaDTO
        return this.http.get<CategoriaDTO[]>(`${API_CONFIGURACOES.urlBase}/categorias`);
    }
}