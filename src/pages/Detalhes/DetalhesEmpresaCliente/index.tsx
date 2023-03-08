import { useState, useEffect } from "react";
import {useLocation} from 'react-router-dom';
import { useForm } from "react-hook-form";
import { Button } from "../../../components/Button";
import { Nav } from "../../../components/Nav";
import { empresasClientesResolver } from "../../../validations";
import { IEmpresaCliente, IEmpresasClientesForm } from "../../../interfaces";
import EmpresasClientesFakeRepository from "../../../repositories/EmpresasClientesFakeRepository";


export function DetalhesEmpresaCliente(){

  const location = useLocation();
  const {state} = location;

  const [empresa, setEmpresa] = useState<IEmpresaCliente>({} as IEmpresaCliente);

  //@ts-expect-error
  const methods = useForm<IEmpresasClientesForm>({resolver:empresasClientesResolver({defaultValues:empresa})});
  const {formState:{errors},setValue,register,handleSubmit} = methods;
  
  async function onSubmit(values:IEmpresasClientesForm){
    const empresasClientesFakeRepository = new EmpresasClientesFakeRepository();
        
    const editedEmpresa={
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

    const updated = await empresasClientesFakeRepository.update({id:location.state.id,newData:editedEmpresa});
  
    alert("Alterações realizadas com sucesso!");
  
  }

  useEffect(()=>{
    async function loadState(){
      const empresasClientesFakeRepository = new EmpresasClientesFakeRepository();
      const storaged = await empresasClientesFakeRepository.findById(location.state.id);
      if(storaged){
        const entries = Object.entries(storaged);
        for(const entry of entries){
          const [key,value] = entry;
          if(value instanceof Object){
            for(const insideEntry of Object.entries(value)){
              const [insideKey,insideValue] = insideEntry;
              setValue(insideKey,insideValue);
            }
          }else{
            setValue(key,value);
          }
        }
        setEmpresa(storaged);
      } 
    }
    loadState();
  },[])

  return(
    <>
      <Nav stick={true}/>
      <section className="container-with-nav">
        <h1 className="text-white outline-title-3 font-medium text-7xl w-full text-center">Detalhes de Empresa Cliente</h1>
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
                      value="Contrato Não Vigente"
                      id="field-nao-vigente"
                  />
                  Não Vigente
              </label>

              <label htmlFor="field-em-contratacao">
                  <input
                      {...register("status")}
                      type="radio"
                      value="Em Contratação"
                      id="field-em-contratacao"
                  />
                  Em Contratação
              </label>             
            </div>
            {errors?.status?.message && (
              <p className="error-text">{errors?.status?.message}</p>
            )} 
                   
            <label htmlFor="endereco">Endereço</label>
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
                        {errors?.cpfRepresentante?.message && (
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
          <Button type="submit" variant="dark" >Salvar Alterações</Button>
        </form>
    </section>
    </>
  )
}