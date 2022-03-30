import { IsDefined, IsNotEmpty, IsString, isNotEmptyObject, IsNotEmptyObject, ValidateIf } from 'class-validator';
import 'reflect-metadata';
import { MessageSenders } from '../../../enums/MessageSenders';
import { UserType } from '../../../types';


export class MessageDto {
    @IsDefined()
    @IsNotEmpty()
    @ValidateIf(user => ( user === MessageSenders.BOT || user === MessageSenders.USER))
    userUuid: string

    @IsDefined()
    @IsNotEmpty()
    sender_type!: UserType

    @IsDefined()
    @IsString()
    @IsNotEmpty()
    content: string
}
