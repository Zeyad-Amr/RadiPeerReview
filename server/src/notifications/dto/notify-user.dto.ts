// src/notifications/dto/notify-user.dto.ts
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { NotificationType, Role } from '@prisma/client';

export class NotifyUserDto {
  @ApiProperty({
    type: () => String,
    enum: Role,
    example: Role.ADMIN,
  })
  @IsNotEmpty()
  receiverRole: Role;

  @ApiProperty({
    type: () => String,
  })
  @IsOptional()
  @IsString()
  receiverId: string;

  @ApiProperty({
    type: () => String,
    example: 'New notification message',
  })
  @IsString()
  @IsOptional()
  message: string;

  @ApiProperty({
    type: () => String,
    enum: NotificationType,
    example: NotificationType.GENERAL,
  })
  @IsNotEmpty()
  type: NotificationType;

  @ApiProperty({
    type: () => String,
    example: 'cku5q5j3w0000l1l4p1w6m1v5',
  })
  @IsString()
  @IsOptional()
  entityId: string;
}
