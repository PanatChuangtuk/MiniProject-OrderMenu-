import { ApiProperty } from '@nestjs/swagger';
//import { Type } from 'class-transformer';
import { IsEmail, IsNumber, IsString } from 'class-validator';

export class CompanyCreateDto {
  @ApiProperty({
    type: Number,
    description: 'CompanyId',
    example: '1',
  })
  @IsNumber()
  company_id: number;

  @ApiProperty({
    type: String,
    description: 'CompanyName',
    example: 'John Wick',
  })
  @IsString()
  company_name: string;

  @ApiProperty({
    type: String,
    example: '168/ Area 52',
  })
  @IsNumber()
  company_address: string;

  @ApiProperty({
    type: Number,

    example: '098-765-1721',
  })
  @IsNumber()
  phone_company: number;

  @ApiProperty({
    type: IsString,

    example: 'ax123@gmail.com',
  })
  @IsEmail()
  email_company: number;
}
