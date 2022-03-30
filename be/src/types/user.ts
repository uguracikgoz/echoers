import { Message } from "../entity/Message.entity";

export interface UserType {
  uuid: string;
  created_at?: Date,
  updated_at?: Date,
  messages?: Array<Message>
}
