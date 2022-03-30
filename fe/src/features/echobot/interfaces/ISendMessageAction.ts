import { AxiosResponse } from 'axios'
import { ActionTypes } from '../enums/ActionsTypes'

import { IMessage } from './'

export default interface ISendMessageAction {
  type: ActionTypes
  payload: IMessage
  subtypes?: string[]
  promise?: Promise<AxiosResponse<any>>
}
