import { Field, InputType } from '@nestjs/graphql';
import { Person } from '../../person/model/person';
import { IsDate, MinLength } from 'class-validator';
import { RefInput } from '../../shared/input/ref-input';
import { OptionalField } from '../../shared/decorator/property/optional-field';
import { GraphQLTimestamp } from '@nestjs/graphql/dist/scalars/timestamp.scalar';

@InputType()
export class CreateLastKnownPlace {
  // More details: If both "where" and "when" fields are null, throw an error
  // indicating that at least one of them must be defined in order to
  // create a LastKnownPlace entity. Check other create-*.ts entities too.
  @OptionalField()
  @MinLength(3)
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
