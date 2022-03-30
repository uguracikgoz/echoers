import { IsDefined, IsNotEmptyObject, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import 'reflect-metadata';
import { MessageDto } from './message.dto';

export class CreateDto {
    @IsDefined()
    @IsObject()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => MessageDto)
    message: MessageDto;
}