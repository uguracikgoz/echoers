import { MessageSenders } from '../enums/MessageSenders';
import { UserType } from './user'
export interface MessageType {
  uuid: string;
  sender_type: MessageSenders.BOT | MessageSenders.USER,
  user: UserType,
  content: string,
  created_at?: Date,
  updated_at?: Date
}
