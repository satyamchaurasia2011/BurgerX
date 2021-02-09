import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';
export const addIngredient = (name) => {
    return {
        type : actionTypes.ADD_INGREDIENT,
        ingredientName : name
    };
};

export const removeIngredient = (name) => {
    return {
        type : actionTypes.REMOVE_INGREDIENT,
        ingredientName : name
    };
};

export const setIngredients = (ingredients) => {
    return {
        type : actionTypes.SET_INGREDIENTS,
        ingredients : ingredients
    }
}
export const fetchIngredient = () => {
    return {
        type : actionTypes.FETCH_INGREDIENT_FAILED
    }
}
export const initIngredients = () =>{
    return dispatch  => {
       return axios.get( 'https://burger-x-aec4b.firebaseio.com/ingredients.json' )
            .then( response => {
               dispatch(setIngredients(response.data));
            } )
            .catch( error => {
                dispatch(fetchIngredient());
            } );
    };
};