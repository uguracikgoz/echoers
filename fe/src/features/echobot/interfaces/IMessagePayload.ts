import { MessageTypes } from '../enums/'

export interface IMessagePayload {
  type: MessageTypes.TEXT
  content: any
}
