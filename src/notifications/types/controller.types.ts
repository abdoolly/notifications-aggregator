import { IsNotEmpty, IsIn, IsString, IsOptional, ValidateIf } from 'class-validator';

export class AddNotificationFeedRequest {
  @IsIn(['Like', 'Comment'])
  @IsNotEmpty()
  type: 'Like' | 'Comment';

  @IsString()
  @IsNotEmpty()
  userId: string;

  @ValidateIf((o) => o.type === 'Comment')
  @IsString()
  @IsNotEmpty()
  commentText: string;
}