import { Field, InputType } from '@nestjs/graphql';
import { IsPassword } from 'src/module/shared/decorator/validator/is-password';
import { Match } from 'src/module/shared/decorator/validator/match';
import { IsUsername } from 'src/module/shared/decorator/validator/is-username';
import { Trim } from 'src/module/shared/decorator/transform/trim';

@InputType()
export class CreateUser {
  @Field()
  @IsUsername()
  @Trim()
  username: string;

  @Field()
  @IsPassword()
  password: string;

  @Field()
  @IsPassword()
  @Match('password')
  confirmPassword: string;
}
