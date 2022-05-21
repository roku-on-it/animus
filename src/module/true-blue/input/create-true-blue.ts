import { Field, InputType } from '@nestjs/graphql';
import { RefInput } from '../../shared/input/ref-input';
import { User } from '../../user/model/user';

@InputType()
export class CreateTrueBlue {
  @Field(() => RefInput)
  user: User;
}
