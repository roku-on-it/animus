import { Field, InputType } from '@nestjs/graphql';
import { AddAcquaintance } from './acquaintance/add-acquaintance';
import { RemoveAcquaintance } from './acquaintance/remove-acquaintance';

@InputType()
export class PersonAction {
  @Field(() => AddAcquaintance, { nullable: true })
  addAcquaintance: AddAcquaintance;

  @Field(() => RemoveAcquaintance, { nullable: true })
  removeAcquaintance: RemoveAcquaintance;
}
