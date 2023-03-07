import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../components/Button";
import { Nav } from "../../../components/Nav";
import {IEmpresaCliente} from "../../../interfaces"
import EmpresasClientesFakeRepository from "../../../repositories/EmpresasClientesFakeRepository";

export function ListaEmpresasClientes(){

  const [empresas, setEmpresas] = useState<IEmpresaCliente[]>([]);

  const navigate = useNavigate();

  const handleNavigate=(id:number)=>{
      navigate('/detalhes-empresa-cliente',{state:{id}});
  }

  useEffect(()=>{
    async function loadState(){
      const empresasClientesFakeRepository = new EmpresasClientesFakeRepository();
      const storaged = await empresasClientesFakeRepository.index();
      setEmpresas(storaged);
      console.log(storaged);
    }
    loadState();
  },[]);

  return(
    <>
      <Nav stick={true}/>
      <section className="container-with-nav bg-cover">
      <div className="w-full h-full flex flex-col items-center justify-center gap-4">
        <div className="w-full flex flex-col justify-center items-center">
          <h1 className="text-white outline-title-3 font-medium text-7xl m-4">Lista de Empresas Clientes</h1>
          <Link to="/cadastro-empresas-clientes">
            <Button variant="light">Cadastrar Empresa Cliente</Button>
          </Link>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4 m-4 mb-0 overflow-auto place-items-center">
          {empresas && empresas.map((empresa)=>(
            <div key={empresa.id} className="flex flex-col w-[250px] h-[250px] first-letter:items-center justify-center gap-2 rounded-1xl bg-card-background text-center border-solid border-r-2 border-b-2 border-card-border">
              <span className="text-lg  text-white">{`${empresa.nome} (${empresa.cnpj})` }</span>
              <span className="text-lg text-white">{empresa.status}</span>
              <div className="w-100px">
                  <Button variant="dark" onClick={()=>{handleNavigate(empresa.id)}}>Detalhes</Button>
              </div>
              
           </div>
          ))}

          </div>
      </div>
    </section>
    </>
  )
}