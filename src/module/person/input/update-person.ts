import { UpdateModel } from '../../shared/input/update-model';
import { InputType } from '@nestjs/graphql';
import { OptionalField } from '../../shared/decorator/property/optional-field';
import { Trim } from '../../shared/decorator/transform/trim';
import { IsNotEmptyObject, Length } from 'class-validator';
import { PersonActions } from './action/person-action';
import { Type } from 'class-transformer';
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

  @OptionalField(() => PersonActions, {
    description: ACTIONS_DESCRIPTION,
  })
  @IsNotEmptyObject()
  @Type(() => PersonActions)
  actions: PersonActions;
}
