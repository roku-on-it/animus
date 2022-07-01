import { Field, InputType } from '@nestjs/graphql';
import { AddAcquaintance } from './acquaintance/add-acquaintance';
import { RemoveAcquaintance } from './acquaintance/remove-acquaintance';

// Separating Add and Remove input types in order to distinguish the actions from each other
// in case we want to handle them specifically one by one with "payload instance of AddAcquaintance".

@InputType()
export class PersonAction {
  @Field(() => AddAcquaintance, { nullable: true })
  addAcquaintance: AddAcquaintance;

  @Field(() => RemoveAcquaintance, { nullable: true })
  removeAcquaintance: RemoveAcquaintance;
}
