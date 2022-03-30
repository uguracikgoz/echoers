import { Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { uuid } from 'uuidv4'
import { Message } from "./Message.entity";
import { BaseEntity } from "./Base.entity";

@Entity("user")
export class User extends BaseEntity {
  constructor(params?: { uuid: string, created_at?: string, updated_at?: string, messages?: Array<Message> }) {
    super();
    if(params) {
      this.uuid = params.uuid || uuid();
      this.created_at = params.created_at;
      this.updated_at = params.updated_at;
      this.messages = params.messages;
    }
  }

  // i prefer to not to use big int PrimaryGeneratedColumn. Migration, sync-up or back-up processes becomes more easier on any disaster scenario
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @OneToMany(() => Message, message => message.user)
  messages: Array<Message>;
}
