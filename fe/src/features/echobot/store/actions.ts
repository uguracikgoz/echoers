import { IMessage } from '../interfaces'
import { ActionTypes } from '../enums'

import { Dispatch } from 'redux'
import ISendMessageAction from '../interfaces/ISendMessageAction'
import EchoBotMsgSvc from '../services/message'
import ICreateUser from '../interfaces/ICreateUser'
import IGetUser from '../interfaces/IGetUser'
import EchoBotUsrSvc from '../services/user'
// Actions
export const sendMessage = (message: IMessage): ISendMessageAction => ({
  type: ActionTypes.SEND_MESSAGE,
  payload: message,
  subtypes: [
    ActionTypes.START_SEND_MESSAGE,
    ActionTypes.SUCCESS_SEND_MESSAGE,
    ActionTypes.FAILED_SEND_MESSAGE,
  ],
  promise: EchoBotMsgSvc.create(message),
})

export const createUser = (): ICreateUser => ({
  type: ActionTypes.CREATE_USER,
  subtypes: [
    ActionTypes.START_CREATE_USER,
    ActionTypes.SUCCESS_CREATE_USER,
    ActionTypes.FAILED_CREATE_USER,
  ],
  promise: EchoBotUsrSvc.createUser(),
});

export const getUser = ():IGetUser => ({
  type: ActionTypes.GET_USER,
  payload: null,
  subtypes: [
    ActionTypes.START_GET_USER,
    ActionTypes.SUCCESS_GET_USER,
    ActionTypes.FAILED_GET_USER,
  ],
  promise: EchoBotUsrSvc.getUser(),
})

// Action Dispatchers
export const startSendMessage =
  (message: IMessage) => (dispatch: Dispatch<ISendMessageAction>) => {
    dispatch(sendMessage(message))
}


export const startCreateUser = () => (dispatch: Dispatch) => {
  dispatch(createUser())
}

export const startGetUser = () => (dispatch: Dispatch) => {
  dispatch(getUser())
}