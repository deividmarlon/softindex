import { useForm } from "react-hook-form";
import { Button } from "../../../components/Button";
import { Nav } from "../../../components/Nav";
import { analistasResolver } from "../../../validations";
import { IAnalistasForm } from "../../../interfaces";
import AnalistasFakeRepository from "../../../repositories/AnalistasFakeRepository";


export function FormularioAnalistas(){

  //@ts-expect-error
  const methods = useForm<IAnalistasForm>({resolver:analistasResolver()});
  const {formState:{errors},register,handleSubmit} = methods;
  
  function onSubmit(values:IAnalistasForm){
    const analistasFakeRepository = new AnalistasFakeRepository();
        
    const newAnalista={
      cpf:values.cpf,
      nome:values.nome,
      telefone:values.telefone,
      email:values.email,
    }

    analistasFakeRepository.create(newAnalista);
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
          <Button type="submit" variant="dark">Enviar</Button>
        </form>
    </section>
    </>
  )
}