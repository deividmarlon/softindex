import { ISoftware, ITecnologia, IVersao, IEmpresaCliente, IChamado } from "../interfaces";

const key = "@SI:SOFTWARES";

interface ICreateSoftware {
  sigla:string;
  nome:string;
  objetivo:string;
  tecnologias: ITecnologia[];
  versoes: IVersao[];
  empresasClientes: IEmpresaCliente[];
  chamados: IChamado[];
}

interface IUpdateSoftware {
  sigla?:string;
  nome?:string;
  objetivo?:string;
  tecnologias?: ITecnologia[];
  versoes?: IVersao[];
  empresasClientes?: IEmpresaCliente[];
  chamados?: IChamado[];
}

interface IFindAndUpdate {
  id:number;
  newData: IUpdateSoftware;
}

interface IEmpresasClientesFakeRepository {
  index(): Promise<ISoftware[]>;
  create(data:ICreateSoftware): Promise<ISoftware>;
  findById(id:number): Promise<ISoftware | undefined>;
  update(props:IFindAndUpdate): Promise<ISoftware | undefined>;
}

class EmpresasClientesFakeRepository implements IEmpresasClientesFakeRepository{
  
  public async index(): Promise<ISoftware[]> {
    const stringfiedValue = localStorage.getItem(key)
    let items:ISoftware[] = [];
    if (stringfiedValue != null) {
      const storagedItems:ISoftware[] = JSON.parse(stringfiedValue);
      items = [...items,...storagedItems];
    }
    return items;
  }

  public async create(data: ICreateSoftware): Promise<ISoftware> {

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

  public async findById(id: number): Promise<ISoftware | undefined> { 

    const storagedItems = await this.index();

    const foundItem = storagedItems.find((item)=>item.id==id);

    return foundItem;

  }

  public async update(props: IFindAndUpdate): Promise<ISoftware | undefined> {

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

