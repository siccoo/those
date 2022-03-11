import React, { createContext, useReducer } from 'react'

const CTX = createContext();


/*
{
    frrom: "user",
    msg: "hi",
    topic: "general"
}
*/

function reducer(state, action) {
    const {from, msg, topic} = action.payload;
    switch (action.type) {
        case "RECEIVE_MESSAGE":
            return {
                ...state,
                [topic]: [
                    ...state[topic],
                    {
                        from,
                        msg
                    }
                ]
            }
        default:
            return state
    }
}

const Store = (props) => {
    const reducerHook = useReducer(reducer, initState);
    return (
        <CTX.Provider value={ }>
            {props.children}
        </CTX.Provider>
    )
}

export default Store;