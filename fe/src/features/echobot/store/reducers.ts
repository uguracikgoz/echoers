import { v4 as uuid } from 'uuid'

import { IInitialState } from '../interfaces'
import { SendMessageActionType, GetUserActionType } from '../types'
import { ActionTypes, MessageSenders, MessageTypes } from '../enums'

export const initialState = {
  messageHistory: [
    {
      uuid: uuid(),
      sender_type: MessageSenders.BOT,
      timestamp: new Date(),
      content: {
        type: MessageTypes.TEXT,
        content: `Hi, I'm echobot 🤖 Send me any message & I'll reply it back to you.`,
      },
    },
  ],
  userUuid: ''
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (
  state: IInitialState = initialState,
  action: SendMessageActionType | GetUserActionType
) => {
  switch (action.type) {
    case ActionTypes.START_SEND_MESSAGE:
      console.log('START_SEND_MESSAGE')
      const pendingBotMessage = {
        uuid: `bot-${action.payload.uuid}`, //pending message
        sender_type: MessageSenders.BOT,
        timestamp: new Date(),
        content: {
          type: MessageTypes.PENDING_BOT_MESSAGE,
          content: '...',
        },
      }
      return {
        ...state,
        messageHistory: [
          ...state.messageHistory,
          action.payload,
          pendingBotMessage,
        ],
      }
    case ActionTypes.SUCCESS_SEND_MESSAGE:
      console.log('SUCCESS_SEND_MESSAGE')
      for(let i=0; i<state.messageHistory.length; i++) {
        if(state.messageHistory[i].uuid === `bot-${action.payload.uuid}`) {
          state.messageHistory[i].sender_type = MessageSenders.BOT;
          state.messageHistory[i].content.content = action.payload.content.content;
          state.messageHistory[i].content.type = MessageTypes.TEXT;
        }
          
      }
      return {
        ...state,
        messageHistory: [...state.messageHistory],
      }
    case ActionTypes.FAILED_SEND_MESSAGE:
      console.log('FAILED_SEND_MESSAGE')
      return {
        ...state,
        messageHistory: [...state.messageHistory],
      }
    case ActionTypes.START_CREATE_USER:
      console.log('START_CREATE_USER')
      return {
        ...state,
        messageHistory: [...state.messageHistory],
        userUuid: localStorage.getItem('userUuid'),
      }
    case ActionTypes.SUCCESS_CREATE_USER:
      console.log('SUCCESS_CREATE_USER')
      return {
        ...state,
        messageHistory: [...state.messageHistory],
        userUuid: localStorage.getItem('userUuid')
      }
    case ActionTypes.FAILED_CREATE_USER:
      console.log('FAILED_CREATE_USER')
      alert("An error occured. Please refresh the page.")
      return {
        ...state,
        messageHistory: [...state.messageHistory],
        userUuid: '',
      }
    case ActionTypes.START_GET_USER:
      console.log("START_GET_USER")
      return {...state, userUuid: localStorage.getItem('userUuid')};
    case ActionTypes.SUCCESS_GET_USER:
      console.log("SUCCESS_GET_USER")      
        return {
          ...state,
          userUuid: localStorage.getItem('userUuid'),
          messageHistory: [...state.messageHistory, ...action.payload.messages]
        }
      case ActionTypes.FAILED_GET_USER:
        console.log("FAILED_GET_USER")
          return {
            ...state
          }
    default:
      return state
  }
}
