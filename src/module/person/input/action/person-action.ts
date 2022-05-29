import { Field, InputType } from '@nestjs/graphql';
import { UpdateAcquaintance } from './acquaintance/update-acquaintance';
import { Type } from 'class-transformer';
import { Person } from '../../model/person';

@InputType()
export class PersonActions {
  person: Person;

  @Field(() => UpdateAcquaintance, { nullable: true })
  @Type(() => UpdateAcquaintance)
  addAcquaintance: UpdateAcquaintance;

  @Field(() => UpdateAcquaintance, { nullable: true })
  @Type(() => UpdateAcquaintance)
  removeAcquaintance: UpdateAcquaintance;
}
