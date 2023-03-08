import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../components/Button";
import { Nav } from "../../../components/Nav";
import {ISoftware} from "../../../interfaces"
import SoftwaresFakeRepository from "../../../repositories/SoftwaresFakeRepository";

export function ListaSoftwares(){

  const [softwares, setSoftwares] = useState<ISoftware[]>([]);

  const navigate = useNavigate();

  const handleNavigate=(id:number)=>{
      navigate('/detalhes-software',{state:{id}});
  }

  useEffect(()=>{
    async function loadState(){
      const softwaresFakeRepository = new SoftwaresFakeRepository();
      const storaged = await softwaresFakeRepository.index();
      setSoftwares(storaged);
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
          <h1 className="text-white outline-title-3 font-medium text-7xl m-4">Lista de Softwares</h1>
          <Link to="/cadastro-softwares">
            <Button variant="light">Cadastrar Software</Button>
          </Link>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4 m-4 mb-0 overflow-auto place-items-center">
          {softwares && softwares.map((software)=>(
            <div key={software.id} className="flex flex-col w-[250px] h-[250px] first-letter:items-center justify-center gap-2 rounded-1xl bg-card-background text-center border-solid border-r-2 border-b-2 border-card-border">
              <span className="text-lg  text-white">{`${software.nome} (${software.sigla})` }</span>
              <span className="text-lg text-white">{software.objetivo}</span>
              <div className="w-100px">
                  <Button variant="dark" onClick={()=>{handleNavigate(software.id)}}>Detalhes</Button>
              </div>
              
           </div>
          ))}

          </div>
      </div>
    </section>
    </>
  )
}