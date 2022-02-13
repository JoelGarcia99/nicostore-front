import types from "../types";

const initS = {
    carrito: "j"
}


export const carritoReducer = (state=initS, action) => {
    
    switch(action.type) {
        case types.getCarrito:
            console.log("asdasdasdasdasd", action.payload);
            return {
                ...action.payload
            }
        case types.addCompra:
            return {
                ...state,
                
            }
        default: return state;
    }
}
