import { Injectable } from "@angular/core";
import { StorageService } from "../storage.service";
import { Carrinho } from "../../models/carrinho";
import { ProdutoDTO } from "../../models/produto.dto";

@Injectable()
export class CarrinhoService {

    constructor(public storageService : StorageService){}

    criarCarrinho() : Carrinho{
        let carrinho : Carrinho = {items: []};
        this.storageService.setCarrinho(carrinho);
        return carrinho;
    }

    buscaCarrinho() : Carrinho{
        let carrinho = this.storageService.getCarrinho();
        if(carrinho == null){
            this.criarCarrinho();
        }
        return carrinho;
    }

    adicionaProdutoCarrinho(produto : ProdutoDTO) : Carrinho{
        let carrinho = this.buscaCarrinho();
        let posicaoNoCarrinho = carrinho.items.findIndex(x => x.produto.id == produto.id);
        if(posicaoNoCarrinho == -1){
            carrinho.items.push({quantidade: 1, produto: produto});
        }else{
            let item = carrinho.items.splice(posicaoNoCarrinho, 1);
            //carrinho.items.push({quantidade: item[0].quantidade+1, produto: produto});
            carrinho.items.unshift({quantidade: item[0].quantidade+1, produto: produto});
        }
        this.storageService.setCarrinho(carrinho);
        return carrinho;
    }

    removeProdutoCarrinho(produto : ProdutoDTO) : Carrinho{
        let carrinho = this.buscaCarrinho();
        let posicaoNoCarrinho = carrinho.items.findIndex(x => x.produto.id == produto.id);
        if(posicaoNoCarrinho != -1){
            carrinho.items.splice(posicaoNoCarrinho, 1);
        }
        this.storageService.setCarrinho(carrinho);
        return carrinho;
    }

    decrementaProdutoCarrinho(produto : ProdutoDTO) : Carrinho{
        let carrinho = this.buscaCarrinho();
        let posicaoNoCarrinho = carrinho.items.findIndex(x => x.produto.id == produto.id);
        if(posicaoNoCarrinho != -1){
            let item = carrinho.items.splice(posicaoNoCarrinho, 1);
            if(item[0].quantidade > 1){
                carrinho.items.push({quantidade: item[0].quantidade-1, produto: produto});
            }else{
                this.removeProdutoCarrinho(produto);
            }   
        }
        this.storageService.setCarrinho(carrinho);
        return carrinho;
    }

    totalCarrinho() : number{
        let carrinho = this.buscaCarrinho();
        if(carrinho.items.length != 0){
            let total = 0;
            let totalItem = 0;
            for(let i = 0; i < carrinho.items.length; i++){
                totalItem = carrinho.items[i].quantidade * carrinho.items[i].produto.preco;
                total = total+totalItem;
            }
            return total;
        }
        return 0;
    }
}