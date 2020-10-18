import * as actions from './actionTypes'


const reducer = (state = 0, action) => {
    switch (action.type) {
        case actions.TOTAL_ASKED:
            let result = action.payload.amount * (1 + (action.payload.rate * action.payload.years));
            return Number.parseFloat(result).toFixed(2);
        case actions.CLEAR_FORM:
            return 0;
        default:
            return state;
    }
}

export default reducer;