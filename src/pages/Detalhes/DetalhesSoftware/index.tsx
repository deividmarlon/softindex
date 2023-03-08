import { useState,useEffect } from "react";
import {useLocation} from 'react-router-dom';
import { Button } from "../../../components/Button";
import { Nav } from "../../../components/Nav";
import { ISoftware, ITecnologia, IVersao, IAnalista, IEmpresaCliente, IChamado} from "../../../interfaces";
import { ModalMultipleChoseEmpresaCliente, ModalChoseAnalista, ModalChoseEmpresaCliente, ModalChoseSomething } from "../../../components/Modal"
import SoftwaresFakeRepository from "../../../repositories/SoftwaresFakeRepository";

type ModalSelectAnalistaProps = {
  setModalOn: React.Dispatch<React.SetStateAction<boolean>>;
  setChoice: (choice:IAnalista,idVers:number)=>void;
  choiceId: number;
  parentId: number;
}

type ModalSelectVersStatusProps = {
  setModalOn: React.Dispatch<React.SetStateAction<boolean>>;
  setChoice: (choice:string,idVers:number)=>void;
  thingChosed: string;
  parentId: number;
  options: string[];
}

type ModalSelectSolicitanteProps = {
  setModalOn: React.Dispatch<React.SetStateAction<boolean>>;
  setChoice: (choice:IEmpresaCliente,idCall:number)=>void;
  choiceId: number;
  parentId: number;
}

type ModalSelectResponsavelProps = {
  setModalOn: React.Dispatch<React.SetStateAction<boolean>>;
  setChoice: (choice:IAnalista,idCall:number)=>void;
  choiceId: number;
  parentId: number;
}

type ModalSelectCallTipoProps = {
  setModalOn: React.Dispatch<React.SetStateAction<boolean>>;
  setChoice: (choice:string,idVers:number)=>void;
  thingChosed: string;
  parentId: number;
  options: string[];
}

type ModalSelectCallStatusProps = {
  setModalOn: React.Dispatch<React.SetStateAction<boolean>>;
  setChoice: (choice:string,idVers:number)=>void;
  thingChosed: string;
  parentId: number;
  options: string[];
}

export function DetalhesSoftware(){
  
  const location = useLocation();
  const {state} = location;
  
  const [software, setSoftware] = useState<ISoftware>({
    id:0,
    sigla: "",
    nome: "",
    objetivo: "",
    tecnologias: [] as ITecnologia[],
    versoes: [] as IVersao[],
    empresasClientes: [] as IEmpresaCliente[],
    chamados: [] as IChamado[]
  });

  const [tecs, setTecs] = useState<ITecnologia[]>([]);

  const [vers, setVers] = useState<IVersao[]>([]);

  const [calls, setCalls] = useState<IChamado[]>([]);

  const [modalOnChoseEmpresaCliente,setModalOnChoseEmpresaCliente] = useState(false);

  const [modalOnChoseAnalista,setModalOnChoseAnalista] = useState(false);
  
  const [modalSelectAnalistaProps,setModalSelectAnalistaProps] = useState<ModalSelectAnalistaProps>({} as ModalSelectAnalistaProps);

  const [modalOnChoseVersStatus,setModalOnChoseVersStatus] = useState(false);
  
  const [modalSelectVersStatusProps,setModalSelectVersStatusProps] = useState<ModalSelectVersStatusProps>({} as ModalSelectVersStatusProps);

  const [modalOnChoseSolicitante,setModalOnChoseSolicitante] = useState(false);
  
  const [modalSelectSolicitanteProps,setModalSelectSolicitanteProps] = useState<ModalSelectSolicitanteProps>({} as ModalSelectSolicitanteProps);

  const [modalOnChoseResponsavel,setModalOnChoseResponsavel] = useState(false);
  
  const [modalSelectResponsavelProps,setModalSelectResponsavelProps] = useState<ModalSelectResponsavelProps>({} as ModalSelectResponsavelProps);

  const [modalOnChoseCallStatus,setModalOnChoseCallStatus] = useState(false);
  
  const [modalSelectCallStatusProps,setModalSelectCallStatusProps] = useState<ModalSelectCallStatusProps>({} as ModalSelectCallStatusProps);

  const [modalOnChoseCallTipo,setModalOnChoseCallTipo] = useState(false);
  
  const [modalSelectCallTipoProps,setModalSelectCallTipoProps] = useState<ModalSelectCallTipoProps>({} as ModalSelectCallTipoProps);

  async function handleSubmit(){
    const softwaresFakeRepository = new SoftwaresFakeRepository();

    await softwaresFakeRepository.update({id:location.state.id,newData:software});
  
    alert("Alterações realizadas com sucesso!");
  }

  function handlePlusTec(){
    const len = tecs.length;
    const newTec = {id:len+1, nome:"",objetivo:""}
    setTecs([...tecs,newTec])
  }

  function handleMinusTec(){
    const minus = tecs;
    minus.pop();
    setTecs([...minus])
  }

  function handlePlusVers(){
    const len = vers.length;
    const blankAnalista = {
      id:0,
      nome:"",
      cpf:"",
      email:"",
      telefone:"",
    }
    const newVers = {id:len+1,data:"", versao:"",responsavel:blankAnalista,status:'Fora de Uso'}
    setVers([...vers,newVers])
  }

  function handleMinusVers(){
    const minus = vers;
    minus.pop();
    setVers([...minus]);
  }

  const handlePlusMinusEmpresaCliente = () =>{
    setModalOnChoseEmpresaCliente(true);
  }

  const handleSelectAnalista = (idAnalista:number,idVers:number) =>{
    setModalSelectAnalistaProps(
      {
        setModalOn: setModalOnChoseAnalista,
        setChoice: (choice,idVers) => {
          setVers(
            vers.map(item=>{
              if (item.id === idVers) {
                return { ...item, responsavel:choice };
              } else {
                return item;
              }
            })
          )
        }, 
        parentId: idVers, 
        choiceId:idAnalista
      }
    );
    setModalOnChoseAnalista(true);
  }

  const handleSelectVersStatus = (status:string,idVers:number) =>{
    setModalSelectVersStatusProps(
      {
        setModalOn: setModalOnChoseVersStatus,
        setChoice: (choice,idVers) => {
          setVers(
            vers.map(item=>{
              if (item.id === idVers) {
                return { ...item, status:choice };
              } else {
                return item;
              }
            })
          )
        }, 
        parentId: idVers, 
        thingChosed:status,
        options:["Disponível","Em Desenvolvimento", "Fora de Uso"]
      }
    );
    setModalOnChoseVersStatus(true);
  }

  const handleSelectCallStatus = (status:string,idCall:number) =>{
    setModalSelectCallStatusProps(
      {
        setModalOn: setModalOnChoseCallStatus,
        setChoice: (choice,idCall) => {
          setCalls(
            calls.map(item=>{
              if (item.id === idCall) {
                return { ...item, status:choice };
              } else {
                return item;
              }
            })
          )
        }, 
        parentId: idCall, 
        thingChosed:status,
        options:["Realizado","Em Desenvolvimento", "Cancelado"]
      }
    );
    setModalOnChoseCallStatus(true);
  }

  const handleSelectCallTipo = (status:string,idCall:number) =>{
    setModalSelectCallTipoProps(
      {
        setModalOn: setModalOnChoseCallTipo,
        setChoice: (choice,idCall) => {
          setCalls(
            calls.map(item=>{
              if (item.id === idCall) {
                return { ...item, tipo:choice };
              } else {
                return item;
              }
            })
          )
        }, 
        parentId: idCall, 
        thingChosed:status,
        options:["Erro","Evolução de Funcionalidade", "Adaptativa"]
      }
    );
    setModalOnChoseCallTipo(true);
  }

  const handleSelectSolicitante = (idSolicitante:number, idCall:number) =>{
    setModalSelectSolicitanteProps(
      {
        setModalOn: setModalOnChoseSolicitante,
        setChoice: (choice,idCall) => {
          setCalls(
            calls.map(item=>{
              if (item.id === idCall) {
                return { ...item, empresaSolicitante:choice };
              } else {
                return item;
              }
            })
          )
        }, 
        parentId: idCall, 
        choiceId:idSolicitante
      }
    );
    setModalOnChoseSolicitante(true);
  }

  const handleSelectResponsavel = (idResponsavel:number, idCall:number) =>{
    setModalSelectResponsavelProps(
      {
        setModalOn: setModalOnChoseResponsavel,
        setChoice: (choice,idCall) => {
          setCalls(
            calls.map(item=>{
              if (item.id === idCall) {
                return { ...item, analistaResponsavel:choice };
              } else {
                return item;
              }
            })
          )
        }, 
        parentId: idCall, 
        choiceId:idResponsavel
      }
    );
    setModalOnChoseResponsavel(true);
  }

  const setEmpresasClientesChoicesToState = (choices:IEmpresaCliente[]) => {
    const empresasClientes = choices;
    setSoftware({...software,empresasClientes})
  }

  function handlePlusChamados(){
    const len = calls.length;
    const blankRepresentanteEmpresaSolicitante = {
      nomeRepresentante:"",
      cpfRepresentante:"",
      emailRepresentante:"",
      telefoneRepresentante:""
    }
    const blankEmpresaSolicitante = {
      id:0,
      nome:"",
      cnpj:"",
      endereco:"",
      telefone:"",
      email:"",
      representante: blankRepresentanteEmpresaSolicitante,
      status: ""
    }
    const blankAnalista = {
      id:0,
      nome:"",
      cpf:"",
      email:"",
      telefone:"",
    }
    const newCall = {
      id:len+1,
      dataAbertura: "",
      empresaSolicitante: blankEmpresaSolicitante,
      analistaResponsavel: blankAnalista,
      descricao: "",
      tipo: "",
      status: ""
    }
    setCalls([...calls,newCall])
  }

  function handleMinusChamados(){
    const minus = calls;
    minus.pop();
    setCalls([...minus]);
  }

  useEffect(()=>{
    setSoftware({...software,tecnologias:tecs,versoes:vers,chamados:calls})
  },[tecs,vers,calls]);

  useEffect(()=>{
    async function loadState(){
      const softwaresFakeRepository = new SoftwaresFakeRepository();
      const storaged = await softwaresFakeRepository.findById(location.state.id);
      if(storaged){
        setSoftware(storaged)
        setTecs(storaged.tecnologias)
        setVers(storaged.versoes)
        setCalls(storaged.chamados)
      } 
    }
    loadState();
  },[]);

  return(
    <>
      <Nav stick={true}/>
      {modalOnChoseEmpresaCliente && <ModalMultipleChoseEmpresaCliente setModalOn={setModalOnChoseEmpresaCliente} setChoices={setEmpresasClientesChoicesToState} choices={software.empresasClientes}/>}
      {modalOnChoseAnalista && <ModalChoseAnalista setModalOn={modalSelectAnalistaProps.setModalOn} setChoice={modalSelectAnalistaProps.setChoice} choiceId={modalSelectAnalistaProps.choiceId} parentId={modalSelectAnalistaProps.parentId}/>}
      {modalOnChoseVersStatus && <ModalChoseSomething setModalOn={modalSelectVersStatusProps.setModalOn} setChoice={modalSelectVersStatusProps.setChoice} thingChosed={modalSelectVersStatusProps.thingChosed} parentId={modalSelectVersStatusProps.parentId} options={modalSelectVersStatusProps.options}/>}
      {modalOnChoseSolicitante && <ModalChoseEmpresaCliente setModalOn={modalSelectSolicitanteProps.setModalOn} setChoice={modalSelectSolicitanteProps.setChoice} choiceId={modalSelectSolicitanteProps.choiceId} parentId={modalSelectSolicitanteProps.parentId}/>}
      {modalOnChoseResponsavel && <ModalChoseAnalista setModalOn={modalSelectResponsavelProps.setModalOn} setChoice={modalSelectResponsavelProps.setChoice} choiceId={modalSelectResponsavelProps.choiceId} parentId={modalSelectResponsavelProps.parentId}/>}
      {modalOnChoseCallStatus && <ModalChoseSomething setModalOn={modalSelectCallStatusProps.setModalOn} setChoice={modalSelectCallStatusProps.setChoice} thingChosed={modalSelectCallStatusProps.thingChosed} parentId={modalSelectCallStatusProps.parentId} options={modalSelectCallStatusProps.options}/>}
      {modalOnChoseCallTipo && <ModalChoseSomething setModalOn={modalSelectCallTipoProps.setModalOn} setChoice={modalSelectCallTipoProps.setChoice} thingChosed={modalSelectCallTipoProps.thingChosed} parentId={modalSelectCallTipoProps.parentId} options={modalSelectCallTipoProps.options}/>}
      <section className="container-with-nav">
        <h1 className="text-white outline-title-3 font-medium text-7xl w-full text-center">Cadastro de Software</h1>
        <form 
          className="form w-full flex flex-col justify-center items-center gap-4" onSubmit={()=>{}}
        >
          <div className="w-full lg:w-2/3">
            <h2>Dados do Software</h2>
            <div className="flex flex-1 gap-2 border-2 border-solid border-primaryDark rounded-md p-2 my-2">
              <div className="flex flex-col flex-1">
                <label htmlFor="nome">Nome:</label>
                <input name="nome" type="text" value={software.nome} onChange={(e)=>{setSoftware({...software,nome:e.target.value})}}/>
                <p className="error-text">{"teste"}</p>
              </div>
              <div className="flex flex-col flex-1">
                <label htmlFor="sigla">Sigla:</label>
                <input name="sigla"  type="text" value={software.sigla} onChange={(e)=>{setSoftware({...software,sigla:e.target.value})}}/>
              </div>
              <div className="flex flex-col flex-1">
                <label htmlFor="objetivo">Objetivo:</label>
                <input name="objetivo" type="text" value={software.objetivo} onChange={(e)=>{setSoftware({...software,objetivo:e.target.value})}}/>
              </div>
            </div>
            
            {/*---TECNOLOGIAS---*/}
            <div className="flex w-full items-center">
              <label htmlFor="tecnologiasUtilizadas">Tecnologias Utilizadas:</label>
              <button type="button" onClick={handlePlusTec} className="flex items-center justify-center bg-black w-[30px] h-full rounded-md ml-2 text-white font-bold text-lg">+</button>
              <button type="button" onClick={handleMinusTec} className="flex items-center justify-center bg-black w-[30px] h-full rounded-md ml-2 text-white font-bold text-lg">-</button>
            </div>
            {tecs && tecs.map((tec)=>(
              <div className="flex w-full gap-2 border-2 border-solid border-primaryDark rounded-md p-2 my-2" key={tec.id}>
                <div className="flex flex-col flex-1">
                  <label htmlFor={`nometec${tec.id}`}>Nome:</label>
                  <input name={`nometec${tec.id}`} value={tec.nome} type="text" 
                    onChange={(e)=>setTecs(tecs.map(item=>{
                      if (item.id === tec.id) {
                        return { ...item, nome:e.target.value };
                      } else {
                        return item;
                      }
                    }))}
                  />
                </div>
                <div className="flex flex-col flex-1">
                  <label htmlFor={`objtec${tec.id}`}>Objetivo:</label>
                  <input name={`objtec${tec.id}`} value={tec.objetivo} type="text" 
                    onChange={(e)=>setTecs(tecs.map(item=>{
                      if (item.id === tec.id) {
                        return { ...item, objetivo:e.target.value };
                      } else {
                        return item;
                      }
                    }))}
                  />
                </div>
              </div>
            ))}

            {/*---VERSOES---*/}
            <div className="flex w-full items-center">
              <label htmlFor="verisonamento">Versionamento:</label>
              <button type="button" onClick={handlePlusVers} className="flex items-center justify-center bg-black w-[30px] h-full rounded-md ml-2 text-white font-bold text-lg">+</button>
              <button type="button" onClick={handleMinusVers} className="flex items-center justify-center bg-black w-[30px] h-full rounded-md ml-2 text-white font-bold text-lg">-</button>
            </div>
            {vers && vers.map((version)=>(
              <div className="flex w-full gap-2 border-2 border-solid border-primaryDark rounded-md p-2 my-2" key={version.id}>
                <div className="flex flex-col flex-1">
                  <label htmlFor={`dataversion${version.id}`}>Data:</label>
                  <input name={`dataversion${version.id}`} value={version.data} type="text" 
                    onChange={(e)=>setVers(vers.map(item=>{
                      if (item.id === version.id) {
                        return { ...item, data:e.target.value };
                      } else {
                        return item;
                      }
                    }))}
                  />
                </div>
                <div className="flex flex-col flex-1">
                  <label htmlFor={`objversion${version.id}`}>Versão:</label>
                  <input name={`objversion${version.id}`} value={version.versao} type="text" 
                    onChange={(e)=>setVers(vers.map(item=>{
                      if (item.id === version.id) {
                        return { ...item, versao:e.target.value };
                      } else {
                        return item;
                      }
                    }))}                  
                  />
                </div>
                <div className="flex flex-col flex-1">
                  <label htmlFor={`responsavelversion${version.id}`}>Responsável:</label>
                  {
                    version.responsavel.id 
                    ?   
                    <div className="flex flex-col flex-1">
                      <input name={`responsavelversion${version.id}`} value={version.responsavel.nome} type="text" disabled/>
                      <button type="button" onClick={()=>{handleSelectAnalista(version.responsavel.id,version.id)}} className="flex items-center justify-center h-full mb-1 border-0  bg-black px-2 rounded-md ml-2 text-white font-bold">Selecionar</button>
                    </div>
                    : 
                      <button type="button" onClick={()=>{handleSelectAnalista(version.responsavel.id,version.id)}} className="flex items-center justify-center h-full mb-1 border-0  bg-black px-2 rounded-md ml-2 text-white font-bold">Selecionar</button>
                  }             
                </div>  
                <div className="flex flex-col flex-1">
                  <label htmlFor={`statusversion${version.id}`}>Status:</label>
                  {
                    version.status.length 
                    ?   
                    <div className="flex flex-col flex-1">
                      <input name={`statusversion${version.id}`} value={version.status} type="text" disabled/>
                      <button type="button" onClick={()=>{handleSelectVersStatus(version.status,version.id)}} className="flex items-center justify-center h-full mb-1 border-0  bg-black px-2 rounded-md ml-2 text-white font-bold">Selecionar</button>
                    </div>
                    : 
                      <button type="button" onClick={()=>{handleSelectVersStatus(version.status,version.id)}} className="flex items-center justify-center h-full mb-1 border-0  bg-black px-2 rounded-md ml-2 text-white font-bold">Selecionar</button>
                  }  
                </div>              
              </div>
            ))}

            {/*---EMPRESAS CLIENTES---*/}
            <div className="flex w-full items-center">
              <label htmlFor="verisonamento">Empresas Usuárias:</label>
              <button type="button" onClick={handlePlusMinusEmpresaCliente} className="flex items-center justify-center bg-black px-4 h-full rounded-md ml-2 text-white font-bold text-lg">+  -</button>
            </div>            
            {software && software.empresasClientes.map((emp)=>(
              <div className="flex flex-col lg:flex-row w-full gap-2 border-2 border-solid border-primaryDark rounded-md p-2 my-2" key={emp.id}>
                <div className="flex flex-col flex-1">
                  <label htmlFor={`nomeemp${emp.id}`}>Empresa:</label>
                  <input name={`nomeemp${emp.id}`} type="text" value={emp.nome} disabled/>
                </div>
                <div className="flex flex-col flex-1">
                  <label htmlFor={`cnpj${emp.id}`}>CNPJ:</label>
                  <input name={`cnpj${emp.id}`} type="text" value={emp.cnpj} disabled/>
                </div>
                <div className="flex flex-col flex-1">
                  <label htmlFor={`respresentante${emp.id}`}>Representante:</label>
                  <input name={`respresentante${emp.id}`} type="text" value={emp.representante.nomeRepresentante} disabled/>
                </div>  
                <div className="flex flex-col flex-1">
                  <label htmlFor={`status${emp.id}`}>Status:</label>
                  <input name={`status${emp.id}`} type="text" value={emp.status} disabled/>
                </div>              
              </div>
            ))}

            {/*---CHAMADOS---*/}
            <div className="flex w-full items-center">
              <label htmlFor="chamados">Chamados:</label>
              <button type="button" onClick={handlePlusChamados} className="flex items-center justify-center bg-black w-[30px] h-full rounded-md ml-2 text-white font-bold text-lg">+</button>
              <button type="button" onClick={handleMinusChamados} className="flex items-center justify-center bg-black w-[30px] h-full rounded-md ml-2 text-white font-bold text-lg">-</button>
            </div> 
            {calls && calls.map((chamado)=>(
              <div className="flex flex-col w-full gap-2 border-2 border-solid border-primaryDark rounded-md p-2 my-2" key={chamado.id}>
                <div className="flex flex-1 gap-2">
                  <div className="flex flex-col flex-1">
                    <label htmlFor={`callcodigo${chamado.id}`}>Código:</label>
                    <input name={`callcodigo${chamado.id}`} type="text" value={chamado.id} disabled/>
                  </div>
                  <div className="flex flex-col flex-1">
                    <label htmlFor={`calldata${chamado.dataAbertura}`}>Data:</label>
                    <input name={`calldata${chamado.dataAbertura}`} type="text" value={chamado.dataAbertura}
                      onChange={(e)=>setCalls(calls.map(item=>{
                        if (item.id === chamado.id) {
                          return { ...item, dataAbertura:e.target.value };
                        } else {
                          return item;
                        }
                      }))}                    
                    />
                  </div>
                  <div className="flex flex-col flex-1">
                    <label htmlFor={`callsolicitante${chamado.id}`}>Solicitante:</label>
                    {
                      chamado.empresaSolicitante.id 
                      ?   
                      <div className="flex flex-col flex-1">
                        <input name={`callsolicitante${chamado.empresaSolicitante.id}`} value={chamado.empresaSolicitante.nome} type="text" disabled/>
                        <button type="button" onClick={()=>{handleSelectSolicitante(chamado.empresaSolicitante.id,chamado.id)}} className="flex items-center justify-center h-full mb-1 border-0  bg-black px-2 rounded-md ml-2 text-white font-bold">Selecionar</button>
                      </div>
                      : 
                        <button type="button" onClick={()=>{handleSelectSolicitante(chamado.empresaSolicitante.id,chamado.id)}} className="flex items-center justify-center h-full mb-1 border-0  bg-black px-2 rounded-md ml-2 text-white font-bold">Selecionar</button>
                    }                    
                  </div>  
                  <div className="flex flex-col flex-1">
                    <label htmlFor={`callresponsavel${chamado.id}`}>Responsável:</label>
                    {
                      chamado.analistaResponsavel.id 
                      ?   
                      <div className="flex flex-col flex-1">
                        <input name={`callresponsavel${chamado.analistaResponsavel.id}`} value={chamado.analistaResponsavel.nome} type="text" disabled/>
                        <button type="button" onClick={()=>{handleSelectResponsavel(chamado.analistaResponsavel.id,chamado.id)}} className="flex items-center justify-center h-full mb-1 border-0  bg-black px-2 rounded-md ml-2 text-white font-bold">Selecionar</button>
                      </div>
                      : 
                        <button type="button" onClick={()=>{handleSelectResponsavel(chamado.analistaResponsavel.id,chamado.id)}} className="flex items-center justify-center h-full mb-1 border-0  bg-black px-2 rounded-md ml-2 text-white font-bold">Selecionar</button>
                    }   
                  </div>  
                </div>
                <div className="flex flex-1 gap-2">
                  <div className="flex flex-col flex-1">
                    <label htmlFor={`calldescricao${chamado.id}`}>Descrição:</label>
                    <input name={`calldescricao${chamado.id}`} type="text" value={chamado.descricao}
                      onChange={(e)=>setCalls(calls.map(item=>{
                        if (item.id === chamado.id) {
                          return { ...item, descricao:e.target.value };
                        } else {
                          return item;
                        }
                      }))}                      
                    />
                  </div> 
                  <div className="flex flex-col flex-1">
                    <label htmlFor={`calltipo${chamado.id}`}>Tipo:</label>
                    {
                      chamado.tipo.length 
                      ?   
                      <div className="flex flex-col flex-1">
                        <input name={`calltipo${chamado.id}`} value={chamado.tipo} type="text" disabled/>
                        <button type="button" onClick={()=>{handleSelectCallTipo(chamado.tipo,chamado.id)}} className="flex items-center justify-center h-full mb-1 border-0  bg-black px-2 rounded-md ml-2 text-white font-bold">Selecionar</button>
                      </div>
                      : 
                        <button type="button" onClick={()=>{handleSelectCallTipo(chamado.tipo,chamado.id)}} className="flex items-center justify-center h-full mb-1 border-0  bg-black px-2 rounded-md ml-2 text-white font-bold">Selecionar</button>
                    } 
                  </div> 
                  <div className="flex flex-col flex-1">
                    <label htmlFor={`callstatus${chamado.id}`}>Status:</label>
                    {
                      chamado.status.length 
                      ?   
                      <div className="flex flex-col flex-1">
                        <input name={`callstatus${chamado.id}`} value={chamado.status} type="text" disabled/>
                        <button type="button" onClick={()=>{handleSelectCallStatus(chamado.status,chamado.id)}} className="flex items-center justify-center h-full mb-1 border-0  bg-black px-2 rounded-md ml-2 text-white font-bold">Selecionar</button>
                      </div>
                      : 
                        <button type="button" onClick={()=>{handleSelectCallStatus(chamado.status,chamado.id)}} className="flex items-center justify-center h-full mb-1 border-0  bg-black px-2 rounded-md ml-2 text-white font-bold">Selecionar</button>
                    }                     
                  </div> 
                </div>
              </div>
            ))}   
          </div>
          <Button type="button" onClick={handleSubmit} variant="dark">Finalizar Cadastro</Button>
        </form>
    </section>
    </>
  )
}