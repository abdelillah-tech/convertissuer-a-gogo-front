import React, {createContext, useReducer} from "react";
import Reducer from './Reducer'


const initialState = {
    isAuthenticated: false,
    token: null,
    selectedFile: {id: null, name: '', url: ''},
    filesList: [],
    codesList: [],
    resultFileUrl: null
};

const Store = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, initialState);

    React.useEffect(() => {
        const token = JSON.parse(localStorage.getItem('token') || null)
        if (token) {
            dispatch({
                type: 'LOGIN',
                payload: {
                    data: {
                        token
                    }
                }
            })
        }
    }, [dispatch])
    
    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
};

export const Context = createContext(initialState);
export default Store;