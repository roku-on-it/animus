import { Field, InputType } from '@nestjs/graphql';
import { RefInput } from '../../../../shared/input/ref-input';
import { Person } from '../../../../person/model/person';
import { LastKnownPlace } from '../../../model/last-known-place';

@InputType()
export class RemoveWith {
  lastKnownPlace: LastKnownPlace;

  @Field(() => RefInput)
  with: Person;
}
