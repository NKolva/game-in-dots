import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility';

const initialState = {
    gameSettings: []
}

const setGameSettings = ( state, action ) => {
    return updateObject( state, {
        gameSettings: action.gameSettings
    });
}

const fetchGameSettingsFailed = ( state ) => {
    return updateObject(state, { error: true });
}

const reducer = ( state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_GAME_SETTINGS_DATA: 
            return setGameSettings(state, action);
        case actionTypes.FETCH_GAME_SETTINGS_FAILED:
            return fetchGameSettingsFailed(state);
        default: return state;
    }
}

export default reducer;