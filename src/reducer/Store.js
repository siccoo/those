import React, { createContext, useReducer } from 'react'

export const CTX = createContext();
const initState = {
    general: [
        {from: "bomi", msg: "hello"},
        {from: "michael", msg: "hello"},
        {from: "obinna", msg: "hello"}
    ],
    topic2: [
        {from: "bomi", msg: "hello"},
        {from: "bomi", msg: "hello"},
        {from: "bomi", msg: "hello"}
    ]
}

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
        <CTX.Provider value={reducerHook}>
            {props.children}
        </CTX.Provider>
    )
}

export default Store;