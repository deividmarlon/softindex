import { IEmpresaCliente, IRepresentanteEmpresaCliente } from "../interfaces";

const key = "@SI:EMPRESAS";

interface ICreateEmpresaCliente {
  nome:string;
  cnpj:string;
  endereco:string;
  telefone:string;
  email:string;
  representante: IRepresentanteEmpresaCliente;
  status: string;
}

interface IUpdateEmpresaCliente {
  nome?:string;
  cnpj?:string;
  endereco?:string;
  telefone?:string;
  email?:string;
  representante?: IRepresentanteEmpresaCliente;
  status?: string;
}

interface IFindAndUpdate {
  id:number;
  newData: IUpdateEmpresaCliente;
}

interface IEmpresasClientesFakeRepository {
  index(): Promise<IEmpresaCliente[]>;
  create(data:ICreateEmpresaCliente): Promise<IEmpresaCliente>;
  findById(id:number): Promise<IEmpresaCliente | undefined>;
  update(props:IFindAndUpdate): Promise<IEmpresaCliente | undefined>;
}

class EmpresasClientesFakeRepository implements IEmpresasClientesFakeRepository{
  
  public async index(): Promise<IEmpresaCliente[]> {
    const stringfiedValue = localStorage.getItem(key)
    let items:IEmpresaCliente[] = [];
    if (stringfiedValue != null) {
      const storagedItems:IEmpresaCliente[] = JSON.parse(stringfiedValue);
      items = [...items,...storagedItems];
    }
    return items;
  }

  public async create(data: ICreateEmpresaCliente): Promise<IEmpresaCliente> {

    const newItem = {id:1,...data};
    const storagedItems = await this.index();
    if(storagedItems.length>0){
      const [lastItem] = storagedItems.slice(-1)
      newItem.id = lastItem.id+1;
      localStorage.setItem(key, JSON.stringify([...storagedItems,newItem]))
    }else{
      localStorage.setItem(key, JSON.stringify([newItem]))
    }
    return newItem;

  }

  public async findById(id: number): Promise<IEmpresaCliente | undefined> { 

    const storagedItems = await this.index();

    const foundItem = storagedItems.find((item)=>item.id==id);

    return foundItem;

  }

  public async update(props: IFindAndUpdate): Promise<IEmpresaCliente | undefined> {

    const storagedItems = await this.index();

    let updated = undefined;
    
    const updatedItems = storagedItems.map((item)=>{
      if(item.id==props.id){
        updated = {...item,...props.newData};
        return updated;
      }else{
        return item;
      }
    });
    const equalsCheck = (a:any, b:any) => {
      return JSON.stringify(a) === JSON.stringify(b);
    }

    if(equalsCheck(storagedItems,updatedItems)) return undefined;

    localStorage.setItem(key, JSON.stringify(updatedItems))

    return updated;
  }
  
}

export default EmpresasClientesFakeRepository;

