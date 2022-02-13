import types from "../types";

const initS = {
  logged: undefined
}

export const authReducer = (state=initS, action) => {

  switch(action.type) {
    case types.login: 
      return {
        logged: true,
        token: action.payload.token,
        user: action.payload.user
      }
    case types.logout: {
      localStorage.removeItem("nicostore-token");
      return {
        logged: false
      }
    }
    default: return state;
  }
}
