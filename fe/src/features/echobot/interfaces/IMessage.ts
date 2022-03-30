import { MessageSenders } from '../enums'
import { IMessagePayload, IUser } from './'

export interface IMessage {
  
  uuid: string
  sender_type: MessageSenders.BOT | MessageSenders.USER
  user: IUser | null
  created_at: string
  updated_at: string
  content: IMessagePayload
}
