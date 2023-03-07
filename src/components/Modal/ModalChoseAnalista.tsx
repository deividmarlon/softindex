import { useState,useEffect } from "react";
import AnalistasFakeRepository from "../../repositories/AnalistasFakeRepository";
import {IAnalista} from "../../interfaces"

type Props = {
  setModalOn: any;
  setChoice: any;
  choiceId: number;
  parentId: number;
}

export function ModalChoseAnalista({ setModalOn, setChoice, choiceId, parentId}:Props){

  const handleOkClick = () => {
    setChoice(checked, parentId)
    setModalOn(false);
  }

  const [analistas, setAnalistas] = useState<IAnalista[]>([]);

  const [checkedState, setCheckedState] = useState<boolean[]>([]);

  const [checked, setChecked] = useState<IAnalista>({} as IAnalista);
  
  const handleOnChange = (index:number,id:number) => {
    
    let newCheckedState = new Array(checkedState.length).fill(false);
    newCheckedState[index] = true;
    const pickedAnalist = analistas.find(item=>item.id==id);
    if(pickedAnalist){
      setChecked(pickedAnalist);
    }
    setCheckedState(newCheckedState);
  }
  
  useEffect(()=>{
    async function loadState(){
      const analistasFakeRepository = new AnalistasFakeRepository();
      const storaged = await analistasFakeRepository.index();
      let newCheckedState = new Array(storaged.length).fill(false);
      const index = storaged.findIndex(item=>item.id==choiceId);
      if(newCheckedState[index]){
        newCheckedState[index] = true;
      }
      setCheckedState(newCheckedState);
      setAnalistas(storaged);
    }
    loadState();
  },[]);

  useEffect(()=>{
    console.log("Analistas: ", analistas)
    console.log("checkedState: ", checkedState)
    console.log("picked: ", checked)
  },[checkedState]);

  return (
  
    <div className="bg-bgModal fixed inset-0 z-50   ">

        <div className="flex h-screen justify-center items-center ">

            <div className="flex-col justify-center w-4/5  bg-white py-5 px-5 border-4 border-black rounded-xl">

                <div className="flex  text-xl w-full font-semibold  text-zinc-600  text-center">Selecione o Analista Responsável:</div>
                
                  <ul className="my-10">
                    {analistas.map(({ id, nome, cpf },index) => {
                      return (
                        <li className="flex items-center h-25 " key={index}>
                              <input className="mr-2"
                                type="radio"
                                name="analista"
                                id={`custom-radio-${index}`}
                                checked={checkedState[index]}
                                onChange={() => handleOnChange(index,id)}
                                />
                              <label htmlFor={`custom-radio-${index}`}>{`${nome} (${cpf})`}</label>
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
