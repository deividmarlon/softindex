type Props = {
  children: React.ReactNode;
}

import { NavMobileProvider } from "./NavMobileContext";

export function AppContexts({children}: Props){
  return(
    <NavMobileProvider>
        {children}
    </NavMobileProvider>
  )
}