import React, { createContext, useReducer } from 'react';
import io from "socket.io-client";

export const CTX = createContext();
const initState = {
    general: [
        { from: "bomi", msg: "hello" },
        { from: "michael", msg: "hello" },
        { from: "obinna", msg: "hello" }
    ],
    topic2: [
        { from: "bomi", msg: "hello" },
        { from: "bomi", msg: "hello" },
        { from: "bomi", msg: "hello" }
    ]
}

let socket;

function sendChatAction(value) {
    socket.emit("chat message", value);
}

function reducer(state, action) {
    const { from, msg, topic } = action.payload;
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
    if (!socket) {
        socket = io(":3006")
    }

    const user = "michael" + Math.random(100).toFixed(2);

    const [allChats] = useReducer(reducer, initState);

    return (
        <CTX.Provider value={{ allChats, sendChatAction }}>
            {props.children}
        </CTX.Provider>
    )
}

export default Store;