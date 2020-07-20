import * as actionTypes from './actionTypes';
import axios from 'axios';

const api = 'https://starnavi-frontend-test-task.herokuapp.com/winners';

export const setWinnersData = (winnersData) => {
    return {
        type: actionTypes.SET_WINNERS_DATA,
        winnersData: winnersData
    }
}

export const fetchWinnersDataFailed = (error) => {
    return {
        type: actionTypes.FETCH_WINNERS_DATA_FAILED,
        error: error
    }
}

export const fetchWinnersData = () => {
    return dispatch => {
        axios.get(api)
        .then(res => {
            dispatch(setWinnersData(res.data))
        })
        .catch(error => {
            dispatch(fetchWinnersDataFailed(error))
        })
    }
}

export const postWinnersData = () => {
    return dispatch => {
        
    }
}