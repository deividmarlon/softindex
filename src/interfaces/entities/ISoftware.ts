import { IVersao, IEmpresaCliente, IChamado } from "..";

export interface ITecnologia{
  id:number;
  nome:string;
  objetivo:string;
}

export interface ISoftware{
  id:number;
  sigla:string;
  nome:string;
  objetivo:string;
  tecnologias: ITecnologia[];
  versoes: IVersao[];
  empresasClientes: IEmpresaCliente[];
  chamados: IChamado[];
}