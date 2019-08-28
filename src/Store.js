import React from 'react';

export const CTX = React.createContext();

/*
    msg {
        from: 'username'
        msg: 'hello'
        topic: 'general'        
    }

    state {
        general: [
            {msg}, {msg}, {msg}, {newmsg}
        ]
        topic2: [
            {msg}, {msg}, {msg}
        ]
        .
        .
        .
    }
*/

const initState = {
    general: [
        {from: 'Megale', msg: 'Eai'},
        {from: 'Galvão', msg: 'Opa'},
        {from: 'Castro', msg: 'fala'}
    ],
    topic2: [
        {from: 'Megale', msg: 'hello'},
        {from: 'Galvão', msg: 'hi'}
    ]
}

function reducer(state, action) {

    const {from, msg, topic} = action.payload;

    switch (action.type) {
        case 'RECEIVE_MESSAGE':
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


export default function Store(props) {

    const reducerHook = React.useReducer(reducer, initState);

    return ( 
        <CTX.Provider value={reducerHook}> 
            {props.children}
        </CTX.Provider>
    )
}