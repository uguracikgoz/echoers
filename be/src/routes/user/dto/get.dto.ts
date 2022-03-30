import { IsDefined, IsObject, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import 'reflect-metadata';
import { UserDto } from './user.dto';


export class GetDto {
    @IsDefined()
    @IsString()
    userUuid: UserDto;
}