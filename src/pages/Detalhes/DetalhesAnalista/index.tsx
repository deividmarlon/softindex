import { useState, useEffect } from "react";
import {useLocation} from 'react-router-dom';
import { useForm } from "react-hook-form";
import { Button } from "../../../components/Button";
import { Nav } from "../../../components/Nav";
import { analistasResolver } from "../../../validations";
import { IAnalista, IAnalistasForm } from "../../../interfaces";
import AnalistasFakeRepository from "../../../repositories/AnalistasFakeRepository";


export function DetalhesAnalista(){

  const location = useLocation();
  const {state} = location;

  const [analista, setAnalista] = useState<IAnalista>({} as IAnalista);

  //@ts-expect-error
  const methods = useForm<IAnalistasForm>({resolver:analistasResolver({defaultValues:analista})});
  const {formState:{errors},setValue,register,handleSubmit} = methods;
  
  async function onSubmit(values:IAnalistasForm){
    const analistasFakeRepository = new AnalistasFakeRepository();
        
    const editedAnalista={
      cpf:values.cpf,
      nome:values.nome,
      telefone:values.telefone,
      email:values.email,
    }

    const updated = await analistasFakeRepository.update({id:location.state.id,newData:editedAnalista});
  }

  useEffect(()=>{
    async function loadState(){
      const analistasFakeRepository = new AnalistasFakeRepository();
      const storaged = await analistasFakeRepository.findById(location.state.id);
      if(storaged){
        const entries = Object.entries(storaged);
        for(const entry of entries){
          const [key,value] = entry;
          setValue(key,value);
        }
        setAnalista(storaged);
      } 
    }
    loadState();
  },[])

  return(
    <>
      <Nav stick={true}/>
      <section className="container-with-nav">
        <h1 className="text-white outline-title-3 font-medium text-7xl w-full text-center">Detalhes de Analista</h1>
        <form 
          className="form w-full flex flex-col justify-center items-center gap-4" onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-full lg:w-1/2">
            <h2>Dados da Analista</h2>
            
            <label htmlFor="cpf">CPF</label>
            <input {...register('cpf')} type="text" />
            {errors?.cpf?.message && (
              <p className="error-text">{errors?.cpf?.message}</p>
            )}
            <label htmlFor="nome">Nome</label>
            <input {...register('nome')} type="text" />
            {errors?.nome?.message && (
              <p className="error-text">{errors?.nome?.message}</p>
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
          <Button type="submit" variant="dark" >Salvar Alterações</Button>
        </form>
    </section>
    </>
  )
}