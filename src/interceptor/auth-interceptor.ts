import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { StorageService } from "../services/storage.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(public storageService:StorageService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let usuarioLogado = this.storageService.getUsuario();
        if(usuarioLogado){
            const novaRequisicao = req.clone({headers: req.headers.set('Authorization', 'Bearer '+usuarioLogado.token)});
            return next.handle(novaRequisicao);
        }else{
            return next.handle(req);
        }
    }

}

export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,

};