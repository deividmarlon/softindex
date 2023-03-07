import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../components/Button";
import { Nav } from "../../../components/Nav";
import {IAnalista} from "../../../interfaces"
import AnalistasFakeRepository from "../../../repositories/AnalistasFakeRepository";

export function ListaAnalistas(){

  const [analistas, setAnalistas] = useState<IAnalista[]>([]);

  const navigate = useNavigate();

  const handleNavigate=(id:number)=>{
      navigate('/detalhes-analista',{state:{id}});
  }

  useEffect(()=>{
    async function loadState(){
      const analistasFakeRepository = new AnalistasFakeRepository();
      const storaged = await analistasFakeRepository.index();
      setAnalistas(storaged);
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
          <h1 className="text-white outline-title-3 font-medium text-7xl m-4">Lista de Analistas</h1>
          <Link to="/cadastro-analistas">
            <Button variant="light">Cadastrar Analista</Button>
          </Link>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4 m-4 mb-0 overflow-auto place-items-center">
          {analistas && analistas.map((analista)=>(
            <div key={analista.id} className="flex flex-col w-[250px] h-[250px] first-letter:items-center justify-center gap-2 rounded-1xl bg-card-background text-center border-solid border-r-2 border-b-2 border-card-border">
              <span className="text-lg  text-white">{`${analista.nome} (${analista.cpf})` }</span>
              <span className="text-lg text-white">{analista.email}</span>
              <div className="w-100px">
                  <Button variant="dark" onClick={()=>{handleNavigate(analista.id)}}>Detalhes</Button>
              </div>
              
           </div>
          ))}

          </div>
      </div>
    </section>
    </>
  )
}