import { IsString } from 'class-validator';

export class GetUserDto {
  @IsString()
  _id: string;
}
