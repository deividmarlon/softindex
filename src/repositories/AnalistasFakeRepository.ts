import { IAnalista } from "../interfaces";

const key = "@SI:ANALISTAS";

interface ICreateAnalista {
  nome:string;
  cpf:string;
  telefone:string;
  email:string;
}

interface IUpdateAnalista {
  nome?:string;
  cpf?:string;
  telefone?:string;
  email?:string;
}

interface IFindAndUpdate {
  id:number;
  newData: IUpdateAnalista;
}

interface IAnalistasFakeRepository {
  index(): Promise<IAnalista[]>;
  create(data:ICreateAnalista): Promise<IAnalista>;
  findById(id:number): Promise<IAnalista | undefined>;
  update(props:IFindAndUpdate): Promise<IAnalista | undefined>;
}

class AnalistasFakeRepository implements IAnalistasFakeRepository{
  
  public async index(): Promise<IAnalista[]> {
    const stringfiedValue = localStorage.getItem(key)
    let items:IAnalista[] = [];
    if (stringfiedValue != null) {
      const storagedItems:IAnalista[] = JSON.parse(stringfiedValue);
      items = [...items,...storagedItems];
    }
    return items;
  }

  public async create(data: ICreateAnalista): Promise<IAnalista> {

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

  public async findById(id: number): Promise<IAnalista | undefined> { 

    const storagedItems = await this.index();

    const foundItem = storagedItems.find((item)=>item.id==id);

    return foundItem;

  }

  public async update(props: IFindAndUpdate): Promise<IAnalista | undefined> {

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

export default AnalistasFakeRepository;

