import { IEmpresaCliente, IAnalista } from "..";

export interface IChamado{
  id: number;
  dataAbertura: string;
  empresaSolicitante:IEmpresaCliente;
  analistaResponsavel: IAnalista;
  descricao: string;
  tipo: string;
  status: string;
}
