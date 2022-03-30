import { IMessage } from './IMessage';

export interface IUser {
  uuid: string;
  created_at?: Date,
  updated_at?: Date,
  messages?: Array<IMessage>
}