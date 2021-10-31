import produce from "immer";
import createReducer from "./ReducersUtils";

const initialState = {
    diamonds: [
        { "shape": "Round", "size": 1.02, "color": "D", "clarity": "IF", "price": 15000, "listPrice": 18000 },
        { "shape": "Pear", "size": 1.5, "color": "E", "clarity": "VVs1", "price": 20000, "listPrice": 21000 },
        { "shape": "Emerald", "size": 0.95, "color": "G", "VVS2": "IF", "price": 12000, "listPrice": 10000 },
        { "shape": "Round", "size": 2.15, "color": "F", "clarity": "I2", "price": 50000, "listPrice": 55000 },
        { "shape": "Emerald", "size": 0.5, "color": "D", "clarity": "IF", "price": 2000, "listPrice": 3000 },
        { "shape": "Pear", "size": 1.2, "color": "G", "clarity": "I1", "price": 15000, "listPrice": 12000 }
    ],
};


const diamonds = {
    setDiamonds(state, action) {
        state.diamonds = action.payload;
    },
};

export default produce(
    (state, action) => createReducer(state, action, diamonds), initialState);