import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

export function analistasResolver(){

  const AnalistasValidationSchema = yup.object({
    cpf: yup.string().required('cpf completo'),
    nome: yup.string().required('nome completo'),
    telefone: yup.string().required('telefone completo'),
    email: yup.string().email('Preencha com um email válido').required('e-mail')
  },)
  
  return yupResolver(AnalistasValidationSchema);
}

