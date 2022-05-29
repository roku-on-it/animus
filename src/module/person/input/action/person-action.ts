import { Field, InputType } from '@nestjs/graphql';
import { UpdateAcquaintance } from './acquaintance/update-acquaintance';
import { Person } from '../../model/person';

@InputType()
export class PersonAction {
  person: Person;

  @Field(() => UpdateAcquaintance, { nullable: true })
  addAcquaintance: UpdateAcquaintance;

  @Field(() => UpdateAcquaintance, { nullable: true })
  removeAcquaintance: UpdateAcquaintance;
}
