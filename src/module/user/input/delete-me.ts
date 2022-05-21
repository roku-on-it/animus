import { Field, InputType } from '@nestjs/graphql';
import { IsPassword } from '../../shared/decorator/validator/is-password';
import { Match } from '../../shared/decorator/validator/match';

@InputType()
export class DeleteMe {
  @Field()
  @IsPassword()
  password: string;

  @Field()
  @IsPassword()
  @Match('password')
  confirmPassword: string;
}
