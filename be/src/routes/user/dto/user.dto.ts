import { IsDefined, IsString } from 'class-validator';
import 'reflect-metadata';

export class UserDto {
    @IsDefined()
    @IsString()
    uuid: string;
}
