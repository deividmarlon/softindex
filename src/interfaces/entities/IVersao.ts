import { IAnalista } from "..";

export interface IVersao{
  id: number,
  data: string;
  versao:string,
  responsavel: IAnalista;
  status: string
}
