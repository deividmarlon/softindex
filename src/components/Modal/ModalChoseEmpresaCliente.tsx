import { useState,useEffect } from "react";
import EmpresasClientesFakeRepository from "../../repositories/EmpresasClientesFakeRepository";
import {IEmpresaCliente} from "../../interfaces"

type Props = {
  setModalOn: any;
  setChoice: any;
  choiceId: number;
  parentId: number;
}

export function ModalChoseEmpresaCliente({ setModalOn, setChoice, choiceId, parentId}:Props){

  const handleOkClick = () => {
    setChoice(checked, parentId)
    setModalOn(false);
  }

  const [empresas, setEmpresas] = useState<IEmpresaCliente[]>([]);

  const [checkedState, setCheckedState] = useState<boolean[]>([]);

  const [checked, setChecked] = useState<IEmpresaCliente>({} as IEmpresaCliente);
  
  const handleOnChange = (index:number,id:number) => {
    
    let newCheckedState = new Array(checkedState.length).fill(false);
    newCheckedState[index] = true;
    const pickedEmpresa = empresas.find(item=>item.id==id);
    if(pickedEmpresa){
      setChecked(pickedEmpresa);
    }
    setCheckedState(newCheckedState);
  }
  
  useEffect(()=>{
    async function loadState(){
      const empresasClientesFakeRepository = new EmpresasClientesFakeRepository();
      const storaged = await empresasClientesFakeRepository.index();
      let newCheckedState = new Array(storaged.length).fill(false);
      const index = storaged.findIndex(item=>item.id==choiceId);
      if(newCheckedState[index]){
        newCheckedState[index] = true;
      }
      setCheckedState(newCheckedState);
      setEmpresas(storaged);
    }
    loadState();
  },[]);

  useEffect(()=>{
    console.log("empresas: ", empresas)
    console.log("checkedState: ", checkedState)
    console.log("picked: ", checked)
  },[checkedState]);

  return (
  
    <div className="bg-bgModal fixed inset-0 z-50   ">

        <div className="flex h-screen justify-center items-center ">

            <div className="flex-col justify-center w-4/5  bg-white py-5 px-5 border-4 border-black rounded-xl">

                <div className="flex  text-xl w-full font-semibold  text-zinc-600  text-center">Selecione a Empresa Solicitante:</div>
                
                  <ul className="my-10">
                    {empresas.map(({ id, nome, cnpj },index) => {
                      return (
                        <li className="flex items-center h-25 " key={index}>
                              <input className="mr-2"
                                type="radio"
                                name="analista"
                                id={`custom-radio-${index}`}
                                checked={checkedState[index]}
                                onChange={() => handleOnChange(index,id)}
                                />
                              <label htmlFor={`custom-radio-${index}`}>{`${nome} (${cnpj})`}</label>
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
