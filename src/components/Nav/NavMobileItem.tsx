import classNames from "classnames";

type Props ={
  variant?: 'default' | 'dark';
  children: React.ReactNode;
}

export function NavMobileItem({variant='default', children}:Props){
  let bgColor = "bg-white hover:bg-gray-100 active:bg-gray-200 transition-all text-black";
  if(variant==='dark') bgColor="bg-primaryDark hover:bg-primaryLight active:bg-gray-200 transition-all text-white" 
  return(
    <div 
      className={
        classNames("w-full p-4 border-b border-gray-100",bgColor)
      }>
      {children}
    </div>
  )
}