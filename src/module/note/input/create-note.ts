import { Field, InputType } from '@nestjs/graphql';
import { Person } from '../../person/model/person';
import { RefInput } from '../../shared/input/ref-input';
import { Trim } from '../../shared/decorator/transform/trim';
import { MaxLength } from 'class-validator';

@InputType()
export class CreateNote {
  @Field()
  @Trim()
  @MaxLength(1000)
  content: string;

  @Field(() => RefInput)
  person: Person;
}
