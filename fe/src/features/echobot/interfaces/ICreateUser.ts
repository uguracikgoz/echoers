import { AxiosResponse } from 'axios'
import { ActionTypes } from '../enums/ActionsTypes'

export default interface ICreateUser {
  type: ActionTypes
  subtypes?: string[]
  promise?: Promise<AxiosResponse<any>>
}
