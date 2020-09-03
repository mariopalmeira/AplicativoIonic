import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { StorageService } from "./storage.service";

@Injectable()
export class HeaderCreator{

    constructor(public httpClient : HttpClient, public storageService : StorageService){}

    montaHeader(){
        let token = this.storageService.getUsuario().token;
        let header = new HttpHeaders({'Authorization': 'Bearer '+token});
        return header
    }
}