import {
  Routes,
  Route
} from "react-router-dom";

import { Home } from "../pages/Home";
import { ListaAnalistas } from "../pages/Listas/ListaAnalistas";
import { ListaEmpresasClientes } from "../pages/Listas/ListaEmpresasClientes";
import { ListaSoftwares } from "../pages/Listas/ListaSoftwares";
import { FormularioEmpresasClientes } from "../pages/Cadastros/FormularioEmpresasClientes";
import { FormularioAnalistas } from "../pages/Cadastros/FormularioAnalistas";
import { FormularioSoftwares } from "../pages/Cadastros/FormularioSoftwares";
import { DetalhesEmpresaCliente } from "../pages/Detalhes/DetalhesEmpresaCliente";
import { DetalhesAnalista } from "../pages/Detalhes/DetalhesAnalista";
import { DetalhesSoftware } from "../pages/Detalhes/DetalhesSoftware";



export function AppRoutes(){
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>

      <Route path="/lista-analistas" element={<ListaAnalistas/>}/>
      <Route path="/lista-empresas-clientes" element={<ListaEmpresasClientes/>}/>
      <Route path="/lista-softwares" element={<ListaSoftwares/>}/>

      <Route path="/cadastro-empresas-clientes" element={<FormularioEmpresasClientes/>}/>
      <Route path="/cadastro-analistas" element={<FormularioAnalistas/>}/>
      <Route path="/cadastro-softwares" element={<FormularioSoftwares/>}/>

      <Route path="/detalhes-empresa-cliente" element={<DetalhesEmpresaCliente/>}/>
      <Route path="/detalhes-analista" element={<DetalhesAnalista/>}/>
      <Route path="/detalhes-software" element={<DetalhesSoftware/>}/>
    </Routes>
  )
}