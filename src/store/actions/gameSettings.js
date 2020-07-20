import * as actionTypes from './actionTypes';
import axios from 'axios';

const api = 'https://starnavi-frontend-test-task.herokuapp.com/game-settings';

export const setGameSettings = ( gameSettings ) => {
    return {
        type: actionTypes.SET_GAME_SETTINGS_DATA,
        gameSettings: gameSettings
    }
}

export const fetchGameSettingsFailed = ( error ) => {
    return {
        type: actionTypes.FETCH_GAME_SETTINGS_FAILED,
        error: error
    }
}

export const fetchGameSettings = () => {
    return dispatch => {
        axios.get(api).then(res => {
            dispatch(setGameSettings(res.data))
        }).catch(error => {
            dispatch(fetchGameSettingsFailed(error))
        })
    }
}