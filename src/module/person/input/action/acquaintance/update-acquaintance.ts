import { Field, InputType } from '@nestjs/graphql';
import { RefInput } from '../../../../shared/input/ref-input';
import { Person } from '../../../model/person';

@InputType()
export class UpdateAcquaintance {
  person: Person;

  @Field(() => RefInput)
  acquaintance: Person;
}
