import React from 'react';


const HeaderComponent = ()=>{
  return (
    <div className="header">
      <div className="logo">
	Nicole
      </div>
      <div className="search">
        <input 
	  type="text" 
	  placeholder="Busque algo"
	/>
        <div className="opt">
	  <button>Buscar</button>
	</div>
      </div>
        <div className="trailing">
	  <div>Salir</div>
	  <div>Carrito</div>
	</div>
    </div>
  )
}

export default HeaderComponent;
