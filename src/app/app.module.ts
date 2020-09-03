import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { HttpClientModule } from '@angular/common/http';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CategoriaService } from '../services/domain/categoria.service';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { ClienteService } from '../services/domain/cliente.service';
import { AuthInterceptorProvider } from '../interceptor/auth-interceptor';
import { ErrorInterceptorProvider } from '../interceptor/error-interceptor';
import { EstadoService } from '../services/domain/estado.service';
import { CidadeService } from '../services/domain/cidade.service';
import { ProdutoService } from '../services/domain/produto.service';
import { HeaderCreator } from '../services/header-creator.service';
import { CarrinhoService } from '../services/domain/carrinho.service';
import { PedidoService } from '../services/domain/pedido.service';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    // AuthInterceptorProvider,
    ErrorInterceptorProvider,
    CategoriaService,
    AuthService,
    StorageService,
    ClienteService,
    EstadoService,
    CidadeService,
    ProdutoService,
    HeaderCreator,
    CarrinhoService,
    PedidoService
  ]
})
export class AppModule {}
