import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

export function softwaresResolver(){

  const SoftwaresValidationSchema = yup.object({
    nome: yup.string().required('nome completo'),
    sigla: yup.string().required('preencha a sigla'),
    objetivo: yup.string().required('preencha o objetivo')
  })
  
  return yupResolver(SoftwaresValidationSchema);
}
