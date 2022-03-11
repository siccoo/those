import React, { createContext, useReducer } from 'react';
import io from "socket.io-client";

export const CTX = createContext();
const initState = {
    general: [
        { from: "bomi", msg: "hello" },
        { from: "michael", msg: "hello" },
        { from: "ire", msg: "hello" }
    ],
    topic2: [
        { from: "bomi", msg: "hello" },
        { from: "iyke", msg: "hello" },
        { from: "ade", msg: "hello" }
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
    const [allChats, dispatch] = useReducer(reducer, initState);

    if (!socket) {
        socket = io(":3006");
        socket.on('chat message', function (msg) {
            dispatch({ type: "RECEIVE_MESSAGE", payload: msg });
        })
    }

    const user = "michael" + Math.random(100).toFixed(2);



    return (
        <CTX.Provider value={{ allChats, sendChatAction, user }}>
            {props.children}
        </CTX.Provider>
    )
}

export default Store;