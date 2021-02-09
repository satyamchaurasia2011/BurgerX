
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    totalPrice: 30,
    error : false,
    building : false
};
const INGREDIENT_PRICES = {
    salad: 20.00,
    cheese: 30.00,
    meat: 50.00,
    bacon: 80.00
};

const reducer = (state = initialState, action) => {
       switch (action.type) {
           case actionTypes.ADD_INGREDIENT :
            return {
                ...state,
                ingredients : {
                    ...state.ingredients,
                   [action.ingredientName] : state.ingredients[action.ingredientName] + 1
            },
            totalPrice : state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
            building : true
            };
          case actionTypes.REMOVE_INGREDIENT :
                return {
                    ...state,
                ingredients : {
                    ...state.ingredients,
                   [action.ingredientName] : state.ingredients[action.ingredientName] - 1
                },
                totalPrice : state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
                building : true
            };
            case actionTypes.SET_INGREDIENTS :
                return {
                    ...state,
                    ingredients : {
                        salad : action.ingredients.salad,
                        bacon : action.ingredients.bacon,
                        cheese : action.ingredients.cheese,
                        meat : action.ingredients.meat
                    },
                    totalPrice : 30,
                    error : false,
                    building : false
                };
            case actionTypes.FETCH_INGREDIENT_FAILED :
                return {
                    ...state,
                    error : true
                };

           default:
               return state;
       }
};

export default reducer;