import { PagamentoDTO } from "./pagamento.dto";
import { ItemPedidoDTO } from "./item-pedido.dto";
import { ObjetoIdDTO } from "./objeto-id.dto";

export interface PedidoDTO{
    cliente : ObjetoIdDTO,
    enderecoEntrega : ObjetoIdDTO,
    pagamento : PagamentoDTO,
    itemPedido : ItemPedidoDTO[] 
}