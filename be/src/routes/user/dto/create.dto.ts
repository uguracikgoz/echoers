import { IsDefined, IsObject } from 'class-validator';
import { Type } from 'class-transformer';
import 'reflect-metadata';
import { UserDto } from './user.dto';

export class CreateDto {
    @IsDefined()
    @IsObject()
    @Type(() => UserDto)
    user: UserDto;
}