export const USER_ACTION_TYPE = {
    SET_CURRENT_USER: 'SET_CURRENT_USER'
}
const INITIAL_STATE = {
    currentUser: null
};

export const userReducer = (state = INITIAL_STATE, action) => {
    const {type, payload} = action;
    console.log('dispatch');
    console.log(action);
    switch(type) {
        case USER_ACTION_TYPE.SET_CURRENT_USER :
            return {
                ...state,
                currentUser : payload
            }
        default:
            return state;  
    }
}

