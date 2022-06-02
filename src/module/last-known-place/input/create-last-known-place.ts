import { Field, InputType } from '@nestjs/graphql';
import { Person } from '../../person/model/person';
import { IsDate, Length } from 'class-validator';
import { RefInput } from '../../shared/input/ref-input';
import { OptionalField } from '../../shared/decorator/property/optional-field';
import { GraphQLTimestamp } from '@nestjs/graphql/dist/scalars/timestamp.scalar';

@InputType()
export class CreateLastKnownPlace {
  @Field()
  @Length(3, 150)
  where: string;

  @OptionalField(() => GraphQLTimestamp)
  @IsDate({
    message: '$property must be a valid timestamp or number of milliseconds',
  })
  when: Date;

  @Field()
  metHere: boolean;

  @Field(() => RefInput)
  person: Person;
}
