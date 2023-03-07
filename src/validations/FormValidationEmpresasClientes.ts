import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

export function empresasClientesResolver(){

  const EmpresasClientesValidationSchema = yup.object({
    cnpj: yup.string().required('cnpj completo'),
    nome: yup.string().required('nome completo'),
    status: yup.string().required("escolha uma opção"),
    endereco: yup.string().required('endereço completo'),
    telefone: yup.string().required('telefone completo'),
    email: yup.string().email('Preencha com um email válido').required('e-mail'),
    cpfRepresentante: yup.string().required('cpf completo'),
    nomeRepresentante: yup.string().required('nome do representante completo'),
    telefoneRepresentante: yup.string().required('telefone do representante completo'),
    emailRepresentante: yup.string().email('Preencha com um email válido').required('e-mail')
  },)
  
  return yupResolver(EmpresasClientesValidationSchema);
}

