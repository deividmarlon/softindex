import { useState,useEffect } from "react";
import EmpresasClientesFakeRepository from "../../repositories/EmpresasClientesFakeRepository";
import {IEmpresaCliente} from "../../interfaces"

type Props = {
  setModalOn: any;
  setChoices: any;
  choices: IEmpresaCliente[];
}

export function ModalMultipleChoseEmpresaCliente({ setModalOn, setChoices, choices}:Props){

  const handleOkClick = () => {
    setChoices(checkeds)
    setModalOn(false);
  }

  const [empresas, setEmpresas] = useState<IEmpresaCliente[]>([]);

  const [checkedState, setCheckedState] = useState<boolean[]>([]);

  const [checkeds, setCheckeds] = useState<IEmpresaCliente[]>(choices);
  
  const handleOnChange = (index:number,id:number) => {
    const isChecked = checkedState[index];
    if(isChecked){
      //remove das escolhas
      const updatedCheckeds = checkeds.filter(item=>(item.id!=id));
      setCheckeds(updatedCheckeds);
    }else{
      //insere nas escolhas
      const found = empresas.find(item=>item.id==id);
      if(found){
        setCheckeds([...checkeds,found]);
      }
    }
    let updatedState = checkedState;
    updatedState[index]= !checkedState[index];
    setCheckedState(updatedState);
  }
  
  useEffect(()=>{
    async function loadState(){
      const empresasClientesFakeRepository = new EmpresasClientesFakeRepository();
      const storaged = await empresasClientesFakeRepository.index();
      setCheckedState(new Array(storaged.length).fill(false));
      setEmpresas(storaged);
      storaged.map((item,index)=>{
        const found = checkeds.find(checked=>checked.id==item.id);
        if(found){
          let updatedState = checkedState;
          updatedState[index]= true;
          setCheckedState(updatedState);
        }
      });
    }
    loadState();
  },[]);

  useEffect(()=>{
    console.log("EMPRESAS: ", empresas)
    console.log("checkedState: ", checkedState)
    console.log("checkeds: ",checkeds)
  },[empresas]);

  return (
  
    <div className="bg-bgModal fixed inset-0 z-50   ">

        <div className="flex h-screen justify-center items-center ">

            <div className="flex-col justify-center w-4/5  bg-white py-5 px-5 border-4 border-black rounded-xl">

                <div className="flex  text-xl w-full font-semibold  text-zinc-600  text-center">Selecione as Empresas Clientes:</div>
                
                  <ul className="my-10">
                    {empresas.map(({ id, nome, cnpj },index) => {
                      return (
                        <li className="flex items-center h-25 " key={index}>
                              <input className="mr-2"
                                type="checkbox"
                                id={`custom-checkbox-${index}`}
                                checked={checkedState[index]}
                                onChange={() => handleOnChange(index,id)}
                                />
                              <label htmlFor={`custom-checkbox-${index}`}>{`${nome} (${cnpj})`}</label>
                        </li>
                      );
                    })}
                  </ul>

                <div className="flex items-center justify-center">
                    <button onClick={handleOkClick} className=" rounded px-4 py-2 text-white  bg-green-400 ">Concluído</button>
                </div>

            </div>
            
        </div>
    </div>
  );
}
