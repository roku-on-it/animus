import { Field, ObjectType } from '@nestjs/graphql';
import { Person } from './person';

@ObjectType()
export class PersonList {
  @Field(() => [Person])
  items: Person[];

  @Field()
  total: number;
}
