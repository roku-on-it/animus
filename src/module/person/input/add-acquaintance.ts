import { Field, InputType } from '@nestjs/graphql';
import { RefInput } from '../../shared/input/ref-input';
import { Person } from '../model/person';

@InputType()
export class AddAcquaintance {
  @Field(() => RefInput)
  person: Person;

  @Field(() => RefInput)
  acquaintance: Person;
}
