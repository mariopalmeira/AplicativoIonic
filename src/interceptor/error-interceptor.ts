import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { StorageService } from "../services/storage.service";
import { AlertController } from "ionic-angular";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{

    constructor(public storageService:StorageService, public alertController: AlertController){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).catch((error, caught) => {
            let errorObjeto = error;
            if(errorObjeto.error){
                errorObjeto = errorObjeto.error;
            }
            if(!errorObjeto.status){
                errorObjeto = JSON.parse(errorObjeto);
            }

            switch(errorObjeto.status){
                case 401:
                    this.handle401();
                break;     
                case 403:
                    this.handle403();
                break;
                case 422:
                    this.handle422(errorObjeto);
                break;

            }
            return Observable.throw(errorObjeto);
        }) as any;
    }

    handle401(){
        let alert = this.alertController.create({
            title:'Erro de autenticação',
            subTitle:'Email ou senha estão incorretos',
            enableBackdropDismiss: false,
            buttons:[{text: 'OK'}]
        });
        alert.present();
    }

    handle403(){
        this.storageService.setUsuario(null);
        let alert = this.alertController.create({
            title:'Autenticação',
            message: 'Algo deu errado. Faça login novamente para continuar.',
            enableBackdropDismiss: false,
            buttons:[{text: 'OK'}]
        });
        alert.present();
    }

    handle422(errorObjeto){        
        let tamanho = errorObjeto.erros;
        let mensagem = '';
        for(let i=0; i < tamanho.length; i++){
            mensagem += '<p>Campo '+errorObjeto.erros[i]['nomeCampo']+' tem o erro: '+errorObjeto.erros[i]['messagem']+'</p>';
        }

        let alert = this.alertController.create({
            title:'Erro no cadastro',
            message: mensagem,
            enableBackdropDismiss: false,
            buttons:[{text: 'OK'}]
        });
        alert.present();
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,

};