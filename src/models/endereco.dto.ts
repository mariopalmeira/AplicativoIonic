import { CidadeDTO } from "./cidade.dto";
import { EstadoDTO } from "./estado.dto";

export interface EnderecoDTO{
    id: string,
    logradouro: string,
    numero: string,
    complemento: string,
    bairro: string,
    cep: string,
    cidade: CidadeDTO
}