import { ApiProperty } from '@nestjs/swagger';

import { IsEmail, IsNumber, IsString } from 'class-validator';

export class BranchCreateDto {
  @ApiProperty({
    type: String,
    description: 'Name of your branch',
    example: 'John Doe',
  })
  @IsString()
  branch_name: string;

  @ApiProperty({
    type: String,
    description: 'Address your branch',
    example: '573/78 Soi Ramkhamhaeng 39 Ramkhamhaeng Road Wangthonglang',
  })
  @IsString()
  branch_address: string;

  @ApiProperty({
    type: String,
    description: 'Your branch number',
    example: '1',
  })
  @IsString()
  branch_number: string;

  @ApiProperty({
    type: String,
    description: 'A valid email address',
    example: 'email@gmail.com',
  })
  @IsEmail()
  branch_email: string;

  @ApiProperty({
    type: String,
    description: 'Phone number',
    example: '022773148',
  })
  @IsString()
  branch_phone: string;

  @ApiProperty({
    type: String,
    description: 'Opening',
    example: '09:00:00',
  })
  @IsString()
  start_time: string;

  @ApiProperty({
    type: String,
    description: 'Closing',
    example: '20:00:00',
  })
  @IsString()
  end_time: string;

  @ApiProperty({
    type: Number,
    description: 'CompanyId',
    example: '1',
  })
  @IsNumber()
  company_id: number;
}

export class BranchResponseDto {
  branch_company_id: number;
  branch_name: string;
  branch_address: string;
  branch_number: string;
  branch_email: string;
  branch_phone: string;
  start_time: string;
  end_time: string;
  company_id: number;
}
