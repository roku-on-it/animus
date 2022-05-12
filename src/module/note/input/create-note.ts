import { Field, InputType } from '@nestjs/graphql';
import { Person } from '../../person/model/person';
import { RefInput } from '../../shared/input/ref-input';
import { Trim } from '../../shared/decorator/transform/trim';
import { MinLength } from 'class-validator';

@InputType()
export class CreateNote {
  @Field()
  @Trim()
  @MinLength(3)
  content: string;

  @Field(() => RefInput)
  person: Person;
}
