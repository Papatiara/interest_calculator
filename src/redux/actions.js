import *  as actions from './actionTypes';

export const submitData = () => ({
    type: actions.TOTAL_ASKED,
    payload: {
        amount: 0,
        years: 0,
        interest: 0
    }
});

export const clearData = () => ({
    type: actions.CLEAR_FORM,
    payload: {}
});