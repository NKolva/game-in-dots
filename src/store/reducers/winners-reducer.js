import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility';

const initialState = {
    user: [],
    computer: [],
    winnersData: []
}

const setWinners = ( state, action ) => {
    return updateObject( state, {
        winnersData: action.winnersData
    });
}

const fetchWinnersFailed = ( state ) => {
    return updateObject(state, { error: true });
}

const reducer = ( state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_WINNERS_DATA: 
            return setWinners(state, action);
        case actionTypes.FETCH_WINNERS_DATA_FAILED:
            return fetchWinnersFailed(state);
        default: return state;
    }
}

export default reducer;