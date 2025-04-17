import { createContext, useEffect, useReducer } from "react";
import { onAuthStateChangedListiener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";
import { createAction } from "../utils/reducer/reducer.utils";


export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
});

export const USER_ACTION_TYPE = {
    SET_CURRENT_USER: 'SET_CURRENT_USER'
}

const userReducer = (state, action) => {
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
            console.error(`unexpected action type passed ${type}`);    
    }

    return {
        currentUser: payload
    }
}

const INITIAL_STATE = {
    currentUser: null
};

export const UserProvider = ({children}) => {
    // const [currentUser, setCurrentUser] = useState(null);

    const [{currentUser}, dispatch] = useReducer(userReducer, INITIAL_STATE); 

    //const {currentUser} = state;
    const setCurrentUser = (user) => {
        dispatch(createAction(USER_ACTION_TYPE.SET_CURRENT_USER, user));
    } 

    const value = {currentUser, setCurrentUser};

     

    useEffect(() =>{
       const unsubscribe =  onAuthStateChangedListiener((user) => {
        setCurrentUser(user);
        if (user) {
            createUserDocumentFromAuth(user);
        }
        console.log(user);
       });
       return unsubscribe;
    },[]);
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

/*

const userReducer = (state, action) => {
    return{
    currentUser: 
    }
    
    }
*/

