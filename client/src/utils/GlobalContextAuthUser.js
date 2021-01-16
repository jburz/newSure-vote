import { createContext, useContext, useReducer } from "react";

//set up global context
const GlobalContextAuthUser = createContext();

//set up global provider & reducer
const defaultState = {
    id: null,
    personId: null,
    uuid: null
};

//reducer 
const reducer = (state, action) => {
    console.log("GlobalContextAuthUser: reducer", { action });
    switch (action.type) {
        case 'UPDATE_USERID':
            return {
                ...state,
                id: action.payload
            };
        case 'UPDATE_PERSONID':
            return {
                ...state,
                personId: action.payload
            };
        case 'UPDATE_UUID':
            return {
                ...state,
                uuid: action.payload
            };
        case 'UPDATE_SIGNINFACE':
            return {
                ...state,
                signInFace: action.payload
            };
        default:
            return state;
    }
};

const GlobalProviderAuthUser = (props) => {
    const [state, dispatch] = useReducer(reducer, defaultState);
    console.log("context state after reducer: ", state);

    return (
        <GlobalContextAuthUser.Provider value={[state, dispatch]} {...props} />
    );
};

export default GlobalProviderAuthUser;

export const useGlobalContextAuthUser = () => {
    return useContext(GlobalContextAuthUser);
};