import classNames from "classnames";
import { Link } from "react-router-dom";
import { useNavMobileContext } from "../../contexts/NavMobileContext";
import { NavButton } from "../NavButton";
import { HamburguerIcon } from "./HamburguerIcon";
import { NavLogo } from "./NavLogo";
import { NavMobileItem } from "./NavMobileItem";

type Props = {
  stick?: boolean;
}
export function Nav({stick}:Props){
  const {isVisible, setIsVisible} = useNavMobileContext();

  let sticked = "";

  if(stick){
    sticked="sticky top-0 z-50";
  }

  return (
    <nav className={classNames(
      "w-full h-20 bg-nav-background border-b border-checkmark text-white",
      sticked
    )}>
      <div className="w-full h-full max-w-7xl m-auto flex item-center justify-between px-4">
        <NavLogo/>
        <div className="hidden lg:flex items-center gap-4">
          <Link to="/">
            <NavButton variant="dark">Home</NavButton>
          </Link>
          <Link to="/lista-softwares">
            <NavButton variant="dark">Softwares</NavButton>
          </Link>
          <Link to="/lista-analistas">
            <NavButton variant="light">Analistas</NavButton>
          </Link>                    
          <Link to="/lista-empresas-clientes">
            <NavButton>Empresas Clientes</NavButton>
          </Link>            
        </div>
        <div className="flex lg:hidden">
          <NavButton onClick={()=>{setIsVisible((prev:any)=>!prev)}}>
            {isVisible ? (
              <span className="font-bold text-2xl">X</span>
            ) :  (
              <HamburguerIcon fill='#c3c3c3'/> 
            )}            
          </NavButton>
        </div>
      </div>
      {isVisible && (
        <div className="w-full h-[calc(100vh-81px)] fixed top-20 left-0 bg-white lg:hidden">
          <div className="flex flex-col items-stretch justify-center">
            <Link to="/">
              <NavMobileItem>
                  Home
              </NavMobileItem>
            </Link>
            <Link to="/softwares">
              <NavMobileItem>Softwares</NavMobileItem>
            </Link>          
            <Link to="/analistas">
              <NavMobileItem>Analistas</NavMobileItem>
            </Link>            
            <Link to="/empresas-clientes">
              <NavMobileItem>Analistas</NavMobileItem>
            </Link>                        
          </div>
        </div>
      )}   
    </nav>
  )
}