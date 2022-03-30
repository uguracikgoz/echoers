import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MessageSenders } from "../enums/MessageSenders";
import { User } from "./User.entity";
import { uuid } from 'uuidv4'
import { BaseEntity } from "./Base.entity";

@Entity('message')
export class Message extends BaseEntity {
  constructor(params?: { uuid: string, sender_type: MessageSenders, user?: User, content: string, created_at?: string, updated_at?: string}) {
    super();
    if(params) {
      this.uuid = params.uuid || uuid();
      this.sender_type = params.sender_type || null;
      this.content = params.content || null;
      this.user = params.user || null;
    }
  }
  
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({
    type: "enum",
    enum: MessageSenders,
    default: MessageSenders.BOT
  })
  
  sender_type: MessageSenders;


  @ManyToOne(() => User, user => user.messages)
  user: User;

  @Column()
  content: string;
}

