import { IRepresentanteEmpresaCliente } from "./IRepresentanteEmpresaCliente";

export interface IEmpresaCliente{
  id:number;
  nome:string;
  cnpj:string;
  endereco:string;
  telefone:string;
  email:string;
  representante: IRepresentanteEmpresaCliente;
  status: string; 
}