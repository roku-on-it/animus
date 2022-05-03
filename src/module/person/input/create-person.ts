import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePerson {
  @Field()
  displayName: string;

  @Field()
  description: string;
}
