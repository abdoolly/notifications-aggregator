import { IsIn, IsNotEmpty, IsString, ValidateIf } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddNotificationFeedRequest {
  @ApiProperty({
    enum: ['Like', 'Comment'],
    description: 'notification type either Like or Comment',
    example: 'Comment'
  })
  @IsIn(['Like', 'Comment'])
  @IsNotEmpty()
  type: 'Like' | 'Comment';

  @ApiProperty({
    type: String,
    description: 'the user id that the notification',
    example: '084300a01df3060f41fad4700a70b6fe'
  })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    type: String,
    description: 'the comment text required only when the type is Comment',
    example: 'this is a sample comment'
  })
  @ValidateIf((o) => o.type === 'Comment')
  @IsString()
  @IsNotEmpty()
  commentText: string;
}