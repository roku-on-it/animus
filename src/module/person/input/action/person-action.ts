import { Field, InputType } from '@nestjs/graphql';
import { UpdateAcquaintance } from './acquaintance/update-acquaintance';

@InputType()
export class PersonAction {
  @Field(() => UpdateAcquaintance, { nullable: true })
  addAcquaintance: UpdateAcquaintance;

  @Field(() => UpdateAcquaintance, { nullable: true })
  removeAcquaintance: UpdateAcquaintance;
}
