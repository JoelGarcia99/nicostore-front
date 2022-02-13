import React from 'react';
import { useNavigate } from 'react-router-dom';


const HeaderComponent = ()=>{

  const navigator = useNavigate();

  const handleOptClick = ()=>{
    return navigator("/admin");
  }

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
	  <div
      onClick={handleOptClick}
    >
      OPT
    </div>
	</div>
    </div>
  )
}

export default HeaderComponent;
