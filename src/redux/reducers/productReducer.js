import types from '../types';

const initS = {
    products: [],
    isLoading: true
}

export const productReducer = (state=initS, action) =>{

    switch(action.type) {
        case types.fetchPro:
            return {
                ...state,
                ...action.payload
            }
        default: return state;
    }
}
