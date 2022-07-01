import { Field, InputType } from '@nestjs/graphql';
import { RemoveWith } from './with/remove-with';
import { AddWith } from './with/add-with';

@InputType()
export class LastKnownPlaceAction {
  @Field(() => AddWith, { nullable: true })
  addWith: AddWith;

  @Field(() => RemoveWith, { nullable: true })
  removeWith: RemoveWith;
}
