import { useEffect } from "react";
import { Nav } from "../../components/Nav";

export function Home(){

  return(
    <>
      <Nav stick={true}/>
      <section className="container-with-nav bg-cover">
      <div className="w-full h-full flex flex-col items-center justify-center gap-4">
        <h1 className="text-white outline-title-3 font-medium text-7xl">SoftIndex</h1>
        <h2 className="text-white outline-title-1 font-medium text-2xl">Gerenciamento de Portfólio de Software</h2>
        <div className="flex gap-4">
        </div>
      </div>
    </section>
    </>
  )
}