import { useState,useEffect } from "react";
import AnalistasFakeRepository from "../../repositories/AnalistasFakeRepository";
import {IAnalista} from "../../interfaces"

type Props = {
  setModalOn: any;
  setChoice: any;
  thingChosed: string;
  parentId: number;
  options: string[];
}

export function ModalChoseSomething({ setModalOn, setChoice, thingChosed, parentId, options=[]}:Props){

  const handleOkClick = () => {
    setChoice(checked, parentId)
    setModalOn(false);
  }

  const [things, setThings] = useState<string[]>([]);

  const [checkedState, setCheckedState] = useState<boolean[]>([]);

  const [checked, setChecked] = useState("");
  
  const handleOnChange = (index:number) => {
    let newCheckedState = new Array(options.length).fill(false);
    newCheckedState[index] = true;
    const pickedThing = options[index];
    if(pickedThing){
      setChecked(pickedThing);
    }
    setCheckedState(newCheckedState);
  }
  
  useEffect(()=>{
    async function loadState(){
      let newCheckedState = new Array(options.length).fill(false);
      const index = options.findIndex(item=>item==thingChosed);
      if(options[index]){
        newCheckedState[index] = true;
      }
      setCheckedState(newCheckedState);
      setThings(options);
    }
    loadState();
  },[]);

  useEffect(()=>{
    console.log("THINGS: ", things)
    console.log("checkedState: ", checkedState)
    console.log("picked: ", checked)
  },[checkedState]);

  return (
  
    <div className="bg-bgModal fixed inset-0 z-50   ">

        <div className="flex h-screen justify-center items-center ">

            <div className="flex-col justify-center w-4/5  bg-white py-5 px-5 border-4 border-black rounded-xl">

                <div className="flex  text-xl w-full font-semibold  text-zinc-600  text-center">Selecione uma opção:</div>
                
                  <ul className="my-10">
                    {things.map((item,index) => {
                      return (
                        <li className="flex items-center h-25 " key={index}>
                              <input className="mr-2"
                                type="radio"
                                name="thing"
                                id={`custom-radio-${index}`}
                                checked={checkedState[index]}
                                onChange={() => handleOnChange(index)}
                                />
                              <label htmlFor={`custom-radio-${index}`}>{item}</label>
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
