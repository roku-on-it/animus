import { Field, InputType } from '@nestjs/graphql';
import { ContactType } from '../model/enum/contact-type';
import { Person } from '../../person/model/person';
import { RefInput } from '../../shared/input/ref-input';
import { IsContactContent } from '../../shared/decorator/validator/is-contact-content';

@InputType()
export class CreateContact {
  @Field()
  @IsContactContent()
  content: string;

  @Field()
  verified: boolean;

  @Field(() => ContactType)
  type: ContactType;

  @Field(() => RefInput)
  person: Person;
}
