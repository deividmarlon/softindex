import classNames from 'classnames';
type Props = {
  type?: 'submit' | 'reset' | 'button' | undefined;
  variant?: 'dark' |'light';
  onClick?: VoidFunction;
  children: React.ReactNode;
}

export function NavButton({type='button',variant, onClick, children}:Props){
  let bgColor = 'text-white';
  if(variant==='dark') bgColor='bg-primaryDark text-white';
  if(variant==='light') bgColor='bg-primaryLight text-black';
  return(
    <button 
      type={type}
      className={classNames(
        "py-2 px-4 rounded-md bg-primary text-lg",
        bgColor
      )}
      onClick={onClick}
    >
      {children}
    </button>
  )
}