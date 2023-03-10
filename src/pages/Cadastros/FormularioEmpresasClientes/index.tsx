import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "../../../components/Button";
import { Nav } from "../../../components/Nav";
import { empresasClientesResolver } from "../../../validations";
import { IEmpresasClientesForm } from "../../../interfaces";
import EmpresasClientesFakeRepository from "../../../repositories/EmpresasClientesFakeRepository";


export function FormularioEmpresasClientes(){
 
  //@ts-expect-error
  const methods = useForm<IEmpresasClientesForm>({resolver:empresasClientesResolver()});
  const {formState:{errors},register,handleSubmit} = methods;
  
  const navigate = useNavigate();

  async function onSubmit(values:IEmpresasClientesForm){
    const empresasClientesFakeRepository = new EmpresasClientesFakeRepository();
        
    const newEmpresa={
      cnpj:values.cnpj,
      nome:values.nome,
      status:values.status,
      telefone:values.telefone,
      email:values.email,
      endereco:values.endereco,
      representante:{
        cpfRepresentante:values.cpfRepresentante,
        nomeRepresentante:values.nomeRepresentante,
        telefoneRepresentante:values.telefoneRepresentante,
        emailRepresentante:values.emailRepresentante
      }
    }

    await empresasClientesFakeRepository.create(newEmpresa);

    navigate('/lista-empresas-clientes');
    alert("Empresa Cliente cadastrada com sucesso!");
  }

  return(
    <>
      <Nav stick={true}/>
      <section className="container-with-nav">
        <h1 className="text-white outline-title-3 font-medium text-7xl w-full text-center">Cadastro de Empresa Cliente</h1>
        <form 
          className="form w-full flex flex-col justify-center items-center gap-4" onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-full lg:w-1/2">
            <h2>Dados da Empresa</h2>
            
            <label htmlFor="cnpj">CNPJ</label>
            <input {...register('cnpj')} type="text" />
            {errors?.cnpj?.message && (
              <p className="error-text">{errors?.cnpj?.message}</p>
            )}
            <label htmlFor="nome">Nome</label>
            <input {...register('nome')} type="text" />
            {errors?.nome?.message && (
              <p className="error-text">{errors?.nome?.message}</p>
            )}

            <label htmlFor="status">Status Contrato</label>
            <div className="flex w-full justify-between items-center text-center bg-white rounded-md">
              <label htmlFor="field-ativo">
                  <input
                      {...register("status")}
                      type="radio"
                      value="Contrato Ativo"
                      id="field-ativo"
                  />
                  Ativo
              </label>

              <label htmlFor="field-cancelado">
                  <input
                      {...register("status")}
                      type="radio"
                      value="Contrato Cancelado"
                      id="field-cancelado"
                  />
                  Cancelado
              </label>
              
              <label htmlFor="field-nao-vigente">
                  <input
                      {...register("status")}
                      type="radio"
                      value="Contrato N??o Vigente"
                      id="field-nao-vigente"
                  />
                  N??o Vigente
              </label>

              <label htmlFor="field-em-contratacao">
                  <input
                      {...register("status")}
                      type="radio"
                      value="Em Contrata????o"
                      id="field-em-contratacao"
                  />
                  Em Contrata????o
              </label>             
            </div>
            {errors?.status?.message && (
              <p className="error-text">{errors?.status?.message}</p>
            )} 
                   
            <label htmlFor="endereco">Endere??o</label>
            <input {...register('endereco')} type="text" />
            {errors?.endereco?.message && (
              <p className="error-text">{errors?.endereco?.message}</p>
            )}

            <label htmlFor="telefone">Telefone</label>
            <input {...register('telefone')} type="text" />
            {errors?.telefone?.message && (
              <p className="error-text">{errors?.telefone?.message}</p>
            )}

            <label htmlFor="email">Email</label>
            <input {...register('email')} type="text" />
            {errors?.email?.message && (
              <p className="error-text">{errors?.email?.message}</p>
            )}

          </div>
          <div className="w-full lg:w-1/2">
            <h2>Dados do Representante</h2>
            <label htmlFor="cpfRepresentante">CPF</label>
            <input {...register('cpfRepresentante')} type="text" />
                        {errors?.cpf?.message && (
              <p className="error-text">{errors?.cpfRepresentante?.message}</p>
            )}
            
            <label htmlFor="nomeRepresentante">Nome</label>
            <input {...register('nomeRepresentante')} type="text" />
                        {errors?.nomeRepresentante?.message && (
              <p className="error-text">{errors?.nomeRepresentante?.message}</p>
            )}
            
            <label htmlFor="telefoneRepresentante">Telefone</label>
            <input {...register('telefoneRepresentante')} type="text" />
                        {errors?.telefoneRepresentante?.message && (
              <p className="error-text">{errors?.telefoneRepresentante?.message}</p>
            )}

            <label htmlFor="emailRepresentante">Email</label>
            <input {...register('emailRepresentante')} type="text" />
                        {errors?.emailRepresentante?.message && (
              <p className="error-text">{errors?.emailRepresentante?.message}</p>
            )}
          </div>   
          <Button type="submit" variant="dark">Finalizar Cadastro</Button>
        </form>
    </section>
    </>
  )
}