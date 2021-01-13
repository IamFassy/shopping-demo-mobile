import * as Action from '../ActionTypes/ProductActionTypes';


export function addToCart(item) {
    
    return {
        type: Action.ADD_TO_CART,
        item
    };
}
