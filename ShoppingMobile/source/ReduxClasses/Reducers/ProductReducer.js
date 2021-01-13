import * as Action from '../ActionTypes/ProductActionTypes';

const INITIAL_STATE = {
    count: 0,
    addedItems: [],
};

export default function productReducer(state = INITIAL_STATE, action) {
    const { item } = action
    switch (action.type) {
        case Action.ADD_TO_CART: {
            let item_exist = state.addedItems.find(itm => itm.id === item.id)
            let counting = 0
            if (item_exist) {
                for (let i = 0; i < state.addedItems.length; i++) {
                    counting = counting + state.addedItems[i].quantity
                }
                return {
                    ...state,
                    count: counting
                }
            }
            else {
                counting = state.count
                return {
                    ...state,
                    addedItems: [...state.addedItems, item],
                    count: counting + item.quantity
                }
            }
        }
        default:
            return state;
    }
}
