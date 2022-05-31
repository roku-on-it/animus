import { Field, ObjectType } from '@nestjs/graphql';
import { SocialProfile } from './social-profile';

@ObjectType()
export class SocialProfileList {
  @Field(() => [SocialProfile])
  items: SocialProfile[];

  @Field()
  total: number;
}
