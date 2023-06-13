import { FRIEND_GET_SUCCESS, MESSAGE_GET_SUCCESS, MESSAGE_SEND_SUCCESS } from "../types/messengerType";

const messengerState = {
    friends: [],
    messages: []
}

export const messengerReducer = (state = messengerState, action) => {
    const { type, payload } = action;

    if (type === FRIEND_GET_SUCCESS) {
        return {
            ...state,
            friends: payload.friends
        }
    }

    if (type === MESSAGE_GET_SUCCESS) {
        return {
            ...state,
            messages: payload.message
        }
    }

    if(type === MESSAGE_SEND_SUCCESS){
        return {
            ...state,
            messages : [...state.messages, payload.message]
        }
    }
    return state;
}