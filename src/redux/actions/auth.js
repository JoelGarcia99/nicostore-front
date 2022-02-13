import Swal from "sweetalert2";
import types from "../types";

export const startLogin = (email, pass)=>{
  return async(dispatch)=>{

    // Swal.fire({
    //   showConfirmButton: false,
    //   allowEscapeKey: false,
    //   allowOutsideClick: false,
    //   onBeforeOpen: ()=>{
	// Swal.showLoading()
    //   }
    // });

    const res = await fetch(`http://localhost:8500/user/login`, {
      method: 'POST',
      body: new URLSearchParams({
	email, pass
      }),
      headers: {
	'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      }
    });

    const jsonRes = await res.json();

    if(!jsonRes.ok) {
      Swal.fire({
        title: "No se pudo iniciar sesión",
        text: jsonRes.mensaje,
        onClose: ()=>Swal.close()
      });
    }
    else{
      dispatch( setLoginData(jsonRes.user, jsonRes.token) );

      localStorage.setItem("nicostore-token", jsonRes.token);
      localStorage.setItem("nicostore-user", JSON.stringify(jsonRes.user));

      Swal.close();
    }
  }
}

export const setLoginData = (userData, token)=>({
  type: types.login,
  payload: {
    token,
    user: userData
  }
});

export const startLogout = ()=>{
  return (dispatch)=>{
    dispatch( setLogout() );
  }
}

export const setLogout = ()=>({
  type: types.logout
})

