import { AxiosResponse } from 'axios'
import { ActionTypes } from '../enums/ActionsTypes'

export default interface IGetUser {
  type: ActionTypes
  payload: any
  subtypes?: string[]
  promise?: Promise<AxiosResponse<any>>
}
