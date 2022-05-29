import { UpdateModel } from '../../shared/input/update-model';
import { InputType } from '@nestjs/graphql';
import { OptionalField } from '../../shared/decorator/property/optional-field';
import { Trim } from '../../shared/decorator/transform/trim';
import { Length } from 'class-validator';
import { PersonAction } from './action/person-action';
import { IsActionArray } from '../../shared/decorator/validator/is-action-array';
import { ACTIONS_DESCRIPTION } from '../../shared/constant/input-field-description';

@InputType()
export class UpdatePerson extends UpdateModel {
  @OptionalField()
  @Trim()
  @Length(3, 255)
  displayName: string;

  @OptionalField()
  @Trim()
  @Length(3, 1000)
  description: string;

  @OptionalField(() => [PersonAction], {
    description: ACTIONS_DESCRIPTION,
  })
  @IsActionArray()
  actions: PersonAction[];
}
